import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

// GET - List all employees
export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const search = searchParams.get('search');
    const department = searchParams.get('department');

    let where: any = {};
    if (search) {
      where.user = {
        OR: [
          { name: { contains: search, mode: 'insensitive' } },
          { email: { contains: search, mode: 'insensitive' } },
        ],
      };
    }
    if (department) where.department = department;

    const employees = await prisma.employee.findMany({
      where,
      include: {
        user: { select: { id: true, name: true, email: true, phone: true, avatar: true, role: true } },
        attendanceLogs: { take: 30, orderBy: { createdAt: 'desc' } },
        leaveRequests: { where: { status: 'PENDING' } },
      },
    });

    return NextResponse.json({ success: true, data: employees });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}

// POST - Create new employee
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, password, phone, department, position, salary, emergencyContact, emergencyPhone } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        phone,
        role: 'STAFF',
      },
    });

    // Create employee
    const employee = await prisma.employee.create({
      data: {
        userId: user.id,
        department,
        position,
        salary: salary ? parseFloat(salary) : null,
        emergencyContact,
        emergencyPhone,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: {
          ...employee,
          user,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
