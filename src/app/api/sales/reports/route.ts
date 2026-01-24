import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET - Sales records with filters
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const dateFrom = searchParams.get('dateFrom');
    const dateTo = searchParams.get('dateTo');
    const receptionistId = searchParams.get('receptionistId');
    const paymentStatus = searchParams.get('paymentStatus');

    let where: any = {};

    if (dateFrom || dateTo) {
      where.createdAt = {};
      if (dateFrom) where.createdAt.gte = new Date(dateFrom);
      if (dateTo) where.createdAt.lte = new Date(dateTo);
    }

    if (receptionistId) where.receptionistId = receptionistId;
    if (paymentStatus) where.paymentStatus = paymentStatus;

    const sales = await prisma.transaction.findMany({
      where,
      include: {
        receptionist: { select: { id: true, name: true, email: true } },
        items: {
          include: {
            service: true,
            product: true,
            beautician: { select: { id: true, user: { select: { name: true } } } },
          },
        },
        payments: true,
        coupon: true,
        membership: true,
        receipt: true,
      },
      orderBy: { createdAt: 'desc' },
      take: 500,
    });

    // Calculate totals
    const totalSales = sales.reduce((sum, s) => sum + s.total, 0);
    const totalDiscount = sales.reduce((sum, s) => sum + s.discount, 0);
    const totalTax = sales.reduce((sum, s) => sum + s.tax, 0);
    const totalPaid = sales.reduce((sum, s) => sum + s.paid, 0);
    const pending = sales.filter((s) => s.paymentStatus === 'PENDING').length;

    return NextResponse.json({
      success: true,
      data: sales,
      summary: {
        totalTransactions: sales.length,
        totalSales,
        totalDiscount,
        totalTax,
        totalPaid,
        pendingPayments: pending,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
