import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const cardNumber = searchParams.get('cardNumber');

    if (!cardNumber) {
      return NextResponse.json(
        { error: 'Card number is required' },
        { status: 400 }
      );
    }

    const membership = await prisma.membershipCard.findUnique({
      where: { cardNumber },
    });

    if (!membership) {
      return NextResponse.json(
        { error: 'Membership card not found' },
        { status: 404 }
      );
    }

    if (!membership.isActive) {
      return NextResponse.json(
        { error: 'Membership card is not active' },
        { status: 400 }
      );
    }

    return NextResponse.json({ data: membership });
  } catch (error) {
    console.error('Error validating membership:', error);
    return NextResponse.json(
      { error: 'Failed to validate membership' },
      { status: 500 }
    );
  }
}
