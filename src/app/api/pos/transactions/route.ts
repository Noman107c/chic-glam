import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Generate transaction number
    const transactionNo = `TXN-${Date.now()}`;
    
    const transaction = await prisma.transaction.create({
      data: {
        transactionNo,
        customerId: body.customerId || undefined,
        customerName: body.customerName,
        customerPhone: body.customerPhone,
        receptionistId: body.receptionistId,
        subtotal: body.subtotal,
        discount: body.discount,
        discountType: body.discountType,
        tax: body.tax,
        total: body.total,
        paid: body.paid,
        balance: body.balance,
        paymentMethod: body.paymentMethod,
        paymentStatus: body.paid >= body.total ? 'PAID' : body.paid > 0 ? 'PARTIAL' : 'PENDING',
        appointmentId: body.appointmentId,
        items: {
          create: body.items,
        },
        payments: body.paid > 0 ? {
          create: [
            {
              amount: body.paid,
              paymentMethod: body.paymentMethod,
              tip: body.tip || 0,
              status: body.paid >= body.total ? 'PAID' : 'PARTIAL',
            },
          ],
        } : undefined,
      },
      include: {
        items: {
          include: {
            service: true,
            product: true,
            beautician: { include: { user: true } },
          },
        },
        payments: true,
      },
    });

    return NextResponse.json({ data: transaction }, { status: 201 });
  } catch (error) {
    console.error('Error creating transaction:', error);
    return NextResponse.json(
      { error: 'Failed to create transaction' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');
    const date = searchParams.get('date');

    let where: any = {};
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      where.createdAt = {
        gte: startDate,
        lt: endDate,
      };
    }

    const transactions = await prisma.transaction.findMany({
      where,
      include: {
        items: {
          include: {
            service: true,
            product: true,
            beautician: { include: { user: true } },
          },
        },
        payments: true,
        receptionist: true,
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    });

    const total = await prisma.transaction.count({ where });

    return NextResponse.json({ data: transactions, total, limit, offset });
  } catch (error) {
    console.error('Error fetching transactions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch transactions' },
      { status: 500 }
    );
  }
}
