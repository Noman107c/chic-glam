import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
        { status: 400 }
      );
    }

    // Authenticate with Supabase
    const { data: authData, error: authError } = await supabaseAdmin.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Get user profile with role
    const { data: userData, error: userError } = await supabaseAdmin
      .from('users')
      .select('id, name, email, role, branch_id, is_active')
      .eq('id', authData.user.id)
      .single();

    if (userError || !userData) {
      return NextResponse.json(
        { error: 'User profile not found' },
        { status: 404 }
      );
    }

    if (!userData.is_active) {
      return NextResponse.json(
        { error: 'Account is deactivated' },
        { status: 403 }
      );
    }

    // Determine dashboard based on role
    let dashboard = 'customer';
    if (userData.role === 'trainer') {
      dashboard = 'trainer';
    } else if (userData.role === 'beautician') {
      dashboard = 'beautician';
    } else if (userData.role === 'admin' || userData.role === 'manager') {
      dashboard = 'admin';
    }

    return NextResponse.json({
      user: {
        id: userData.id,
        name: userData.name,
        email: userData.email,
        role: userData.role,
        branchId: userData.branch_id,
        dashboard,
      },
      token: authData.session?.access_token,
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
