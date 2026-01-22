import { supabaseClient } from '@/lib/supabaseClient';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'super_admin' | 'beautician' | 'trainer';
  is_active: boolean;
  created_at: string;
}

export const userService = {
  // Create a new user
  async createUser(userData: Omit<User, 'id' | 'created_at'>): Promise<User> {
    const { data, error } = await supabaseClient
      .from('users')
      .insert([userData])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  // Get user by ID
  async getUserById(id: string): Promise<User | null> {
    const { data, error } = await supabaseClient
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // No rows found
      throw new Error(error.message);
    }
    return data;
  },

  // Get all users (for super admin)
  async getAllUsers(): Promise<User[]> {
    const { data, error } = await supabaseClient
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data || [];
  },

  // Update user
  async updateUser(id: string, updates: Partial<User>): Promise<User> {
    const { data, error } = await supabaseClient
      .from('users')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  // Assign role to user
  async assignRole(userId: string, role: User['role']): Promise<User> {
    return this.updateUser(userId, { role });
  },

  // Toggle user active status
  async toggleUserStatus(userId: string): Promise<User> {
    const user = await this.getUserById(userId);
    if (!user) throw new Error('User not found');

    return this.updateUser(userId, { is_active: !user.is_active });
  },

  // Delete user
  async deleteUser(id: string): Promise<void> {
    const { error } = await supabaseClient
      .from('users')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
  },
};
