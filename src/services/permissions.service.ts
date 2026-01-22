import { supabaseClient } from '@/lib/supabaseClient';

export interface Permission {
  id: string;
  name: string;
  description?: string;
  created_at: string;
}

export const permissionsService = {
  // Create a new permission
  async create(permissionData: Omit<Permission, 'id' | 'created_at'>): Promise<Permission> {
    const { data, error } = await supabaseClient
      .from('permissions')
      .insert([permissionData])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  // Get all permissions
  async getAll(): Promise<Permission[]> {
    const { data, error } = await supabaseClient
      .from('permissions')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data || [];
  },

  // Get permission by ID
  async getById(id: string): Promise<Permission | null> {
    const { data, error } = await supabaseClient
      .from('permissions')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null; // No rows found
      throw new Error(error.message);
    }
    return data;
  },

  // Delete permission
  async delete(id: string): Promise<void> {
    const { error } = await supabaseClient
      .from('permissions')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
  },
};
