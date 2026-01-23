import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const beauticians = await prisma.beautician.findMany({
      where: { isAvailable: true },
      select: {
        id: true,
        userId: true,
        specialization: true,
        experience: true,
        rating: true,
        isAvailable: true,
        hourlyRate: true,
        totalEarnings: true,
        servicesCount: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            avatar: true,
          },
        },
      },
    });

    return NextResponse.json({ 
      success: true,
      data: beauticians,
      count: beauticians.length,
    });
  } catch (error) {
    console.error('Error fetching beauticians:', error);
    return NextResponse.json(
      { 
        success: false,
        error: 'Failed to fetch beauticians',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
