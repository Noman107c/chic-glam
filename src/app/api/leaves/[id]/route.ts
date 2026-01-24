import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// PATCH - Approve or reject leave
export async function PATCH(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const leaveId = searchParams.get('id');
    const body = await req.json();
    const { status, approvedBy } = body; // status: 'APPROVED' or 'REJECTED'

    if (!leaveId || !status || !approvedBy) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (!['APPROVED', 'REJECTED'].includes(status)) {
      return NextResponse.json(
        { success: false, error: 'Invalid status' },
        { status: 400 }
      );
    }

    const updatedLeave = await prisma.leaveRequest.update({
      where: { id: leaveId },
      data: {
        status,
        approvedBy,
        approvedAt: new Date(),
      },
    });

    return NextResponse.json({ success: true, data: updatedLeave });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
