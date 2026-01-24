import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { supabaseClient } from '@/lib/supabaseClient';

interface SaleItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  category: string;
}

interface SaleData {
  customerName: string;
  items: SaleItem[];
  subtotal: number;
  discount: number;
  total: number;
  paymentMethod: 'cash' | 'card';
  staffId?: string;
}

// POST - Create a new sale and update inventory
export async function POST(req: NextRequest) {
  try {
    const body: SaleData = await req.json();
    const { customerName, items, subtotal, discount, total, paymentMethod, staffId } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No items in sale' },
        { status: 400 }
      );
    }

    // Start transaction for inventory updates
    const transaction = await prisma.$transaction(async (tx) => {
      // Check inventory availability for all items
      for (const item of items) {
        const product = await tx.product.findUnique({
          where: { id: item.id },
        });

        if (!product) {
          throw new Error(`Product ${item.name} not found`);
        }

        if (product.quantity < item.quantity) {
          throw new Error(`Insufficient inventory for ${item.name}. Available: ${product.quantity}, Required: ${item.quantity}`);
        }
      }

      // Update inventory for each item
      for (const item of items) {
        // Decrease product quantity
        await tx.product.update({
          where: { id: item.id },
          data: {
            quantity: {
              decrement: item.quantity,
            },
          },
        });

        // Log inventory change
        await tx.inventoryLog.create({
          data: {
            productId: item.id,
            type: 'sale',
            quantity: -item.quantity,
            reason: `Sale to ${customerName}`,
          },
        });
      }

      return true;
    });

    // Record sale in Supabase
    const saleData = {
      staff_id: staffId || 'system',
      customer_id: 'walk-in', // For POS sales, use walk-in customer
      amount: total,
      service_type: 'POS',
      sale_date: new Date().toISOString().split('T')[0],
    };

    const { data: sale, error: saleError } = await supabaseClient
      .from('sales')
      .insert([saleData])
      .select()
      .single();

    if (saleError) {
      console.error('Error recording sale:', saleError);
      // Note: Inventory was already updated, but sale recording failed
      // You might want to implement a retry mechanism or alert system here
    }

    // Generate monthly revenue data
    const currentDate = new Date();
    const currentMonth = currentDate.toISOString().slice(0, 7); // YYYY-MM format

    // Get monthly sales from Supabase
    const { data: monthlySales, error: monthlyError } = await supabaseClient
      .from('sales')
      .select('amount')
      .gte('sale_date', `${currentMonth}-01`)
      .lte('sale_date', `${currentMonth}-31`);

    if (monthlyError) {
      console.error('Error fetching monthly sales:', monthlyError);
    }

    const monthlyRevenue = monthlySales?.reduce((sum, sale) => sum + sale.amount, 0) || 0;

    return NextResponse.json({
      success: true,
      data: {
        sale: sale || null,
        monthlyRevenue,
        inventoryUpdated: true,
      }
    }, { status: 201 });

  } catch (error) {
    console.error('Sale processing error:', error);
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// GET - Get sales data with monthly revenue
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const month = searchParams.get('month'); // Format: YYYY-MM
    const year = searchParams.get('year'); // Format: YYYY

    let dateFilter = {};

    if (month) {
      const startDate = `${month}-01`;
      const endDate = new Date(month + '-01');
      endDate.setMonth(endDate.getMonth() + 1);
      endDate.setDate(0); // Last day of month
      const endDateStr = endDate.toISOString().split('T')[0];

      dateFilter = {
        gte: startDate,
        lte: endDateStr,
      };
    } else if (year) {
      dateFilter = {
        gte: `${year}-01-01`,
        lte: `${year}-12-31`,
      };
    }

    const { data: sales, error } = await supabaseClient
      .from('sales')
      .select('*')
      .order('sale_date', { ascending: false });

    if (error) throw new Error(error.message);

    // Calculate monthly revenue
    const monthlyRevenue: { [key: string]: number } = {};

    sales?.forEach((sale: any) => {
      const monthKey = sale.sale_date.slice(0, 7); // YYYY-MM
      monthlyRevenue[monthKey] = (monthlyRevenue[monthKey] || 0) + sale.amount;
    });

    return NextResponse.json({
      success: true,
      data: {
        sales: sales || [],
        monthlyRevenue,
      }
    });

  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
