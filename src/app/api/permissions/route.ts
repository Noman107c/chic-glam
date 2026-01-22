import { NextRequest, NextResponse } from 'next/server';
import { permissionsService } from '@/services/permissions.service';

export async function GET(request: NextRequest) {
  try {
    const permissions = await permissionsService.getAll();
    return NextResponse.json({ data: permissions });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch permissions' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const permission = await permissionsService.create(body);
    return NextResponse.json({ data: permission }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create permission' },
      { status: 500 }
    );
  }
}
