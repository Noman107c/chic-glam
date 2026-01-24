import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import bcrypt from 'bcryptjs';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const { full_name, email, password, role, is_active } = body;

        // Validation
        if (!full_name || !email || !password || !role) {
            return NextResponse.json(
                { message: 'Missing required fields' },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return NextResponse.json(
                { message: 'Password must be at least 6 characters long' },
                { status: 400 }
            );
        }

        // Check if user already exists
        const { data: existingUser } = await supabase
            .from('users')
            .select('id')
            .eq('email', email)
            .single();

        if (existingUser) {
            return NextResponse.json(
                { message: 'User with this email already exists' },
                { status: 409 }
            );
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user in Supabase
        const { data: newUser, error } = await supabase
            .from('users')
            .insert([
                {
                    full_name,
                    email,
                    password_hash: hashedPassword,
                    role,
                    is_active: is_active ?? true,
                },
            ])
            .select()
            .single();

        if (error) {
            console.error('Error creating user:', error);
            return NextResponse.json(
                { message: error.message || 'Failed to create user' },
                { status: 500 }
            );
        }

        // Return user without password
        const { password_hash, ...userWithoutPassword } = newUser;

        return NextResponse.json(userWithoutPassword, { status: 201 });
    } catch (error: any) {
        console.error('Error in POST /api/users:', error);
        return NextResponse.json(
            { message: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}

export async function GET(request: NextRequest) {
    try {
        const { data: users, error } = await supabase
            .from('users')
            .select('id, full_name, email, role, is_active, created_at')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching users:', error);
            return NextResponse.json(
                { message: error.message || 'Failed to fetch users' },
                { status: 500 }
            );
        }

        return NextResponse.json(users, { status: 200 });
    } catch (error: any) {
        console.error('Error in GET /api/users:', error);
        return NextResponse.json(
            { message: error.message || 'Internal server error' },
            { status: 500 }
        );
    }
}
