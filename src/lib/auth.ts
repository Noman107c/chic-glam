import { NextRequest } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export interface AuthUser {
  id: string;
  email: string;
  role: string;
  name?: string;
}

export async function getAuthUser(request: NextRequest): Promise<AuthUser | null> {
  try {
    const authHeader = request.headers.get('authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }

    const token = authHeader.substring(7);

    // Verify the JWT token with Supabase
    const { data: { user }, error } = await supabaseAdmin.auth.getUser(token);

    if (error || !user) {
      return null;
    }

    // Get user profile with role
    const { data: userData, error: userError } = await supabaseAdmin
      .from('users')
      .select('id, full_name, email, role')
      .eq('id', user.id)
      .single();

    if (userError || !userData) {
      return null;
    }

    return {
      id: userData.id,
      email: userData.email,
      role: userData.role || 'customer',
      name: userData.full_name
    };
  } catch (error) {
    console.error('Auth error:', error);
    return null;
  }
}

export async function requireAuth(request: NextRequest): Promise<AuthUser> {
  const user = await getAuthUser(request);

  if (!user) {
    throw new Error('Unauthorized');
  }

  return user;
}

export async function requireRole(request: NextRequest, allowedRoles: string[]): Promise<AuthUser> {
  const user = await requireAuth(request);

  if (!allowedRoles.includes(user.role)) {
    throw new Error('Forbidden');
  }

  return user;
}

export async function requireAdmin(request: NextRequest): Promise<AuthUser> {
  return requireRole(request, ['admin']);
}
