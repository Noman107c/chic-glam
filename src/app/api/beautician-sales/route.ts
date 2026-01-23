import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const beauticianId = searchParams.get('beauticianId');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    let query = supabase
      .from('beautician_sales')
      .select(`
        *,
        beautician:users(full_name, email),
        service:services(name, price)
      `);

    if (beauticianId) {
      query = query.eq('beautician_id', beauticianId);
    }

    if (startDate) {
      query = query.gte('transaction_date', startDate);
    }

    if (endDate) {
      query = query.lte('transaction_date', endDate);
    }

    const { data, error } = await query.order('transaction_date', { ascending: false });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { beauticianId, serviceId, customerName, amount, commission, paymentMethod } = body;

    if (!beauticianId || !serviceId || !customerName || !amount) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const { data, error } = await supabase
      .from('beautician_sales')
      .insert({
        beautician_id: beauticianId,
        service_id: serviceId,
        customer_name: customerName,
        amount,
        commission: commission || 0,
        payment_method: paymentMethod || 'cash',
      })
      .select()
      .single();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
