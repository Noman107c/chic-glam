import { NextRequest, NextResponse } from 'next/server';
import { staffService } from '@/services/staff.service';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const action = searchParams.get('action'); // 'today', 'history', 'stats'

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    if (action === 'today') {
      const todayAttendance = await staffService.getTodayAttendance(userId);
      return NextResponse.json({ data: todayAttendance });
    } else if (action === 'history') {
      const limit = parseInt(searchParams.get('limit') || '30');
      const offset = parseInt(searchParams.get('offset') || '0');

      const history = await staffService.getAttendanceHistory(userId, limit, offset);
      return NextResponse.json({ data: history });
    } else if (action === 'stats') {
      const stats = await staffService.getAttendanceStats(userId);
      return NextResponse.json({ data: stats });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch attendance data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, userId, attendanceId, location } = body;

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    if (action === 'checkin') {
      const attendance = await staffService.checkIn(userId, location);
      return NextResponse.json({ data: attendance }, { status: 201 });
    } else if (action === 'checkout' && attendanceId) {
      const attendance = await staffService.checkOut(attendanceId);
      return NextResponse.json({ data: attendance });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process attendance' },
      { status: 500 }
    );
  }
}
