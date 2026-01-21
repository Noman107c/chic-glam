import { NextRequest, NextResponse } from 'next/server';
import { servicesService } from '@/lib/database';

export async function GET(request: NextRequest) {
  try {
    const services = await servicesService.getAll();
    return NextResponse.json({ data: services });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch services' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const service = await servicesService.create(body);
    return NextResponse.json({ data: service }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to create service' },
      { status: 500 }
    );
  }
}
