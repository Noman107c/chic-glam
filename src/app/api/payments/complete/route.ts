import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const {
      transactionId,
      customerId,
      customerName,
      customerPhone,
      cashierName,
      items,
      subtotal,
      discount,
      discountPercent,
      tax,
      total,
      paid,
      change,
      paymentMethod,
      notes,
    } = body;

    // Generate receipt number
    const receiptNumber = `RCP-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

    // Update transaction status
    const updatedTransaction = await prisma.transaction.update({
      where: { id: transactionId },
      data: {
        paymentStatus: 'PAID',
        paid: paid,
        balance: 0,
        updatedAt: new Date(),
      },
    });

    // Create receipt
    const receipt = await prisma.receipt.create({
      data: {
        receiptNumber,
        transactionId,
        businessName: 'Chic & Glam',
        businessPhone: '+92 300 123 4567',
        businessEmail: 'info@chicglam.com',
        businessAddress: 'Lahore, Pakistan',
        customerName: customerName || 'Customer',
        customerPhone,
        cashierName: cashierName || 'Cashier',
        items: items || [],
        subtotal,
        discount,
        discountPercent,
        tax,
        total,
        paid,
        change,
        paymentMethod: paymentMethod.toUpperCase(),
        paymentStatus: 'PAID',
        notes,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: 'Payment completed successfully',
        data: {
          transaction: updatedTransaction,
          receipt: {
            ...receipt,
            items: typeof receipt.items === 'string' ? JSON.parse(receipt.items) : receipt.items,
          },
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Payment error:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Payment processing failed',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

// GET receipt by receipt number
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const receiptNumber = searchParams.get('receiptNumber');
    const transactionId = searchParams.get('transactionId');

    let receipt;

    if (receiptNumber) {
      receipt = await prisma.receipt.findUnique({
        where: { receiptNumber },
      });
    } else if (transactionId) {
      receipt = await prisma.receipt.findUnique({
        where: { transactionId },
      });
    } else {
      return NextResponse.json(
        { success: false, error: 'Missing receipt number or transaction ID' },
        { status: 400 }
      );
    }

    if (!receipt) {
      return NextResponse.json(
        { success: false, error: 'Receipt not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          ...receipt,
          items: typeof receipt.items === 'string' ? JSON.parse(receipt.items) : receipt.items,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error fetching receipt:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch receipt',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
