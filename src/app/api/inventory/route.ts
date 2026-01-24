import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Fetch all products with inventory
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const isLow = searchParams.get('isLow') === 'true';

    let where: any = { isActive: true };

    if (category) where.category = category;
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }
    if (isLow) where.quantity = { lte: prisma.product.fields.reorderLevel };

    const products = await prisma.product.findMany({
      where,
      include: { inventoryLogs: { take: 10, orderBy: { createdAt: 'desc' } } },
    });

    return NextResponse.json({ success: true, data: products });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// POST - Create new product
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, description, category, price, quantity, reorderLevel, supplier, image } = body;

    if (!name || !category || price === undefined) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const product = await prisma.product.create({
      data: {
        name,
        description,
        category,
        price: parseFloat(price),
        quantity: parseInt(quantity) || 0,
        reorderLevel: parseInt(reorderLevel) || 10,
        supplier,
        image,
        isActive: true,
      },
    });

    // Log initial inventory
    await prisma.inventoryLog.create({
      data: {
        productId: product.id,
        type: 'add',
        quantity: quantity || 0,
        reason: 'Initial stock',
      },
    });

    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
