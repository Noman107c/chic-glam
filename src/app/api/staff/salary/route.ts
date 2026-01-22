import { NextRequest, NextResponse } from 'next/server';
import { staffService } from '@/services/staff.service';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get('userId');
    const action = searchParams.get('action'); // 'history', 'current', 'calculate'

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID is required' },
        { status: 400 }
      );
    }

    if (action === 'history') {
      const limit = parseInt(searchParams.get('limit') || '12');
      const offset = parseInt(searchParams.get('offset') || '0');

      const history = await staffService.getSalaryHistory(userId, limit, offset);
      return NextResponse.json({ data: history });
    } else if (action === 'current') {
      const currentSalary = await staffService.getCurrentMonthSalary(userId);
      return NextResponse.json({ data: currentSalary });
    } else if (action === 'calculate') {
      const month = parseInt(searchParams.get('month') || (new Date().getMonth() + 1).toString());
      const year = parseInt(searchParams.get('year') || new Date().getFullYear().toString());

      const calculation = await staffService.calculateSalary(userId, month, year);
      return NextResponse.json({ data: calculation });
    }

    return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch salary data' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, month, year, bonuses, deductions, status } = body;

    if (!userId || !month || !year) {
      return NextResponse.json(
        { error: 'User ID, month, and year are required' },
        { status: 400 }
      );
    }

    // Calculate salary first
    const calculation = await staffService.calculateSalary(userId, month, year);

    // Create or update salary record
    const salaryData = {
      user_id: userId,
      base_salary: calculation.baseSalary,
      commission: calculation.commission,
      bonuses: bonuses || 0,
      deductions: deductions || 0,
      total_salary: calculation.totalSalary + (bonuses || 0) - (deductions || 0),
      month,
      year,
      status: status || 'pending',
    };

    // Note: This would typically insert into staff_salaries table
    // For now, returning the calculated data
    return NextResponse.json({ data: salaryData }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process salary' },
      { status: 500 }
    );
  }
}
