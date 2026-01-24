import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST - Update inventory (add/use/return)
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { productId, type, quantity, reason } = body;

    if (!productId || !type || quantity === undefined) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const product = await prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    let newQuantity = product.quantity;
    if (type === 'add') newQuantity += quantity;
    else if (type === 'use') newQuantity -= quantity;
    else if (type === 'return') newQuantity += quantity;

    if (newQuantity < 0) {
      return NextResponse.json(
        { success: false, error: 'Insufficient stock' },
        { status: 400 }
      );
    }

    // Update product quantity
    const updatedProduct = await prisma.product.update({
      where: { id: productId },
      data: { quantity: newQuantity },
    });

    // Log the transaction
    const log = await prisma.inventoryLog.create({
      data: {
        productId,
        type,
        quantity,
        reason,
      },
    });

    return NextResponse.json({
      success: true,
      data: { product: updatedProduct, log },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// GET - Inventory logs for a product
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const productId = searchParams.get('productId');

    if (!productId) {
      return NextResponse.json(
        { success: false, error: 'Product ID required' },
        { status: 400 }
      );
    }

    const logs = await prisma.inventoryLog.findMany({
      where: { productId },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, data: logs });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
