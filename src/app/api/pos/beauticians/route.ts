import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const beauticians = await prisma.beautician.findMany({
      where: { isAvailable: true },
      include: { user: true },
    });

    return NextResponse.json({ data: beauticians });
  } catch (error) {
    console.error('Error fetching beauticians:', error);
    return NextResponse.json(
      { error: 'Failed to fetch beauticians' },
      { status: 500 }
    );
  }
}
