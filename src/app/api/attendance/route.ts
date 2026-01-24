import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// POST - Check in/out employee
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, employeeId, type } = body; // type: 'checkin' or 'checkout'

    if (!userId || !employeeId || !type) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if already checked in today
    const existingLog = await prisma.attendanceLog.findFirst({
      where: {
        userId,
        employeeId,
        createdAt: { gte: today },
      },
    });

    if (type === 'checkin') {
      if (existingLog) {
        return NextResponse.json(
          { success: false, error: 'Already checked in today' },
          { status: 400 }
        );
      }

      const checkInTime = new Date();
      const workStartTime = new Date();
      workStartTime.setHours(9, 0, 0, 0); // 9 AM

      const isLate = checkInTime > workStartTime;

      const log = await prisma.attendanceLog.create({
        data: {
          userId,
          employeeId,
          checkInTime,
          isLate,
        },
      });

      return NextResponse.json({ success: true, data: log });
    } else if (type === 'checkout') {
      if (!existingLog) {
        return NextResponse.json(
          { success: false, error: 'No check-in found for today' },
          { status: 400 }
        );
      }

      const checkOutTime = new Date();
      const workEndTime = new Date();
      workEndTime.setHours(17, 0, 0, 0); // 5 PM

      let overtime = 0;
      if (checkOutTime > workEndTime) {
        overtime = Math.floor((checkOutTime.getTime() - workEndTime.getTime()) / (1000 * 60));
      }

      const updatedLog = await prisma.attendanceLog.update({
        where: { id: existingLog.id },
        data: {
          checkOutTime,
          overtime,
        },
      });

      return NextResponse.json({ success: true, data: updatedLog });
    }

    return NextResponse.json(
      { success: false, error: 'Invalid type' },
      { status: 400 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// GET - Attendance logs
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const employeeId = searchParams.get('employeeId');
    const userId = searchParams.get('userId');
    const dateFrom = searchParams.get('dateFrom');
    const dateTo = searchParams.get('dateTo');

    let where: any = {};
    if (employeeId) where.employeeId = employeeId;
    if (userId) where.userId = userId;
    if (dateFrom || dateTo) {
      where.createdAt = {};
      if (dateFrom) where.createdAt.gte = new Date(dateFrom);
      if (dateTo) where.createdAt.lte = new Date(dateTo);
    }

    const logs = await prisma.attendanceLog.findMany({
      where,
      include: {
        user: { select: { id: true, name: true, email: true } },
        employee: { select: { id: true, department: true, position: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    return NextResponse.json({ success: true, data: logs });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch attendance' },
      { status: 500 }
    );
  }
}


