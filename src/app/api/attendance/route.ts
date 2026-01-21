import { NextRequest, NextResponse } from 'next/server';
import { attendanceService } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '100');
    const offset = parseInt(searchParams.get('offset') || '0');

    const result = await attendanceService.getAll(limit, offset);
    return NextResponse.json({
      data: result.data,
      total: result.count,
      limit,
      offset
    });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch attendance' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, customerName, id } = body;

    if (action === 'checkin') {
      const attendance = await attendanceService.checkIn(customerName);
      return NextResponse.json({ data: attendance }, { status: 201 });
    } else if (action === 'checkout' && id) {
      const attendance = await attendanceService.checkOut(id);
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
