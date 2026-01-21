import { NextRequest, NextResponse } from 'next/server';
import { rolesService } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const roles = await rolesService.getAll();
    return NextResponse.json({ data: roles });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch roles' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const role = await rolesService.create(body);
    return NextResponse.json({ data: role }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create role' },
      { status: 500 }
    );
  }
}
