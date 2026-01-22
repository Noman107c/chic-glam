import { supabaseAdmin } from './supabaseAdmin';

// Type definitions
export interface User {
  id: string;
  full_name: string;
  email: string;
  role_id: string;
  is_active: boolean;
  created_at: string;
}

export interface Role {
  id: string;
  name: string;
  description?: string;
  permissions?: string[];
  created_at: string;
}

export interface Permission {
  id: string;
  name: string;
}

export interface Attendance {
  id: string;
  customer_name: string;
  check_in: string;
  check_out?: string;
  sync_status: string;
}

export interface Expense {
  id: string;
  title: string;
  amount: number;
  sync_status: string;
  created_at: string;
}

export interface Payment {
  id: string;
  customer_name: string;
  amount: number;
  payment_method: string;
  status: string;
  sync_status: string;
  created_at: string;
}

export interface Service {
  id: string;
  name: string;
  price: number;
  duration_minutes?: number;
  created_at: string;
}

export interface Appointment {
  id: string;
  customer_name: string;
  service_id: string;
  trainer_id: string;
  appointment_time: string;
  status: string;
  sync_status: string;
  created_at: string;
}

// Users Service
export const usersService = {
  async getAll() {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data as User[];
  },

  async getById(id: string) {
    const { data, error } = await supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw new Error(error.message);
    return data as User;
  },

  async create(user: Omit<User, 'id' | 'created_at'>) {
    const { data, error } = await supabaseAdmin
      .from('users')
      .insert([user])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as User;
  },

  async update(id: string, updates: Partial<User>) {
    const { data, error } = await supabaseAdmin
      .from('users')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as User;
  },

  async delete(id: string) {
    const { error } = await supabaseAdmin
      .from('users')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
    return true;
  },
};

// Roles Service
export const rolesService = {
  async getAll() {
    const { data, error } = await supabaseAdmin
      .from('roles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data as Role[];
  },

  async getById(id: string) {
    const { data, error } = await supabaseAdmin
      .from('roles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw new Error(error.message);
    return data as Role;
  },

  async create(role: Omit<Role, 'id' | 'created_at'>) {
    const { data, error } = await supabaseAdmin
      .from('roles')
      .insert([role])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Role;
  },

  async update(id: string, updates: Partial<Role>) {
    const { data, error } = await supabaseAdmin
      .from('roles')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Role;
  },

  async delete(id: string) {
    const { error } = await supabaseAdmin
      .from('roles')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
    return true;
  },
};

// Permissions Service
export const permissionsService = {
  async getAll() {
    const { data, error } = await supabaseAdmin
      .from('permissions')
      .select('*')
      .order('name', { ascending: true });

    if (error) throw new Error(error.message);
    return data as Permission[];
  },

  async create(permission: Omit<Permission, 'id'>) {
    const { data, error } = await supabaseAdmin
      .from('permissions')
      .insert([permission])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Permission;
  },
};

// Attendance Service
export const attendanceService = {
  async getAll(limit: number = 100, offset: number = 0) {
    const { data, error, count } = await supabaseAdmin
      .from('attendance')
      .select('*', { count: 'exact' })
      .range(offset, offset + limit - 1)
      .order('check_in', { ascending: false });

    if (error) throw new Error(error.message);
    return { data: data as Attendance[], count: count || 0 };
  },

  async checkIn(customerName: string) {
    const { data, error } = await supabaseAdmin
      .from('attendance')
      .insert([{ customer_name: customerName, check_in: new Date().toISOString() }])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Attendance;
  },

  async checkOut(id: string) {
    const { data, error } = await supabaseAdmin
      .from('attendance')
      .update({ check_out: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Attendance;
  },
};

// Expenses Service
export const expensesService = {
  async getAll(limit: number = 100, offset: number = 0) {
    const { data, error, count } = await supabaseAdmin
      .from('expenses')
      .select('*', { count: 'exact' })
      .range(offset, offset + limit - 1)
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return { data: data as Expense[], count: count || 0 };
  },

  async create(expense: Omit<Expense, 'id' | 'created_at' | 'sync_status'>) {
    const { data, error } = await supabaseAdmin
      .from('expenses')
      .insert([{ ...expense, sync_status: 'synced' }])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Expense;
  },

  async update(id: string, updates: Partial<Expense>) {
    const { data, error } = await supabaseAdmin
      .from('expenses')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Expense;
  },

  async delete(id: string) {
    const { error } = await supabaseAdmin
      .from('expenses')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
    return true;
  },
};

// Payments Service
export const paymentsService = {
  async getAll(limit: number = 100, offset: number = 0) {
    const { data, error, count } = await supabaseAdmin
      .from('payments')
      .select('*', { count: 'exact' })
      .range(offset, offset + limit - 1)
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return { data: data as Payment[], count: count || 0 };
  },

  async create(payment: Omit<Payment, 'id' | 'created_at' | 'sync_status'>) {
    const { data, error } = await supabaseAdmin
      .from('payments')
      .insert([{ ...payment, sync_status: 'synced' }])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Payment;
  },

  async update(id: string, updates: Partial<Payment>) {
    const { data, error } = await supabaseAdmin
      .from('payments')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Payment;
  },

  async delete(id: string) {
    const { error } = await supabaseAdmin
      .from('payments')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
    return true;
  },
};

// Services Service
export const servicesService = {
  async getAll() {
    const { data, error } = await supabaseAdmin
      .from('services')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data as Service[];
  },

  async getById(id: string) {
    const { data, error } = await supabaseAdmin
      .from('services')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw new Error(error.message);
    return data as Service;
  },

  async create(service: Omit<Service, 'id' | 'created_at'>) {
    const { data, error } = await supabaseAdmin
      .from('services')
      .insert([service])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Service;
  },

  async update(id: string, updates: Partial<Service>) {
    const { data, error } = await supabaseAdmin
      .from('services')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Service;
  },

  async delete(id: string) {
    const { error } = await supabaseAdmin
      .from('services')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
    return true;
  },
};

// Appointments Service
export const appointmentsService = {
  async getAll(limit: number = 100, offset: number = 0) {
    const { data, error, count } = await supabaseAdmin
      .from('appointments')
      .select('*', { count: 'exact' })
      .range(offset, offset + limit - 1)
      .order('appointment_time', { ascending: false });

    if (error) throw new Error(error.message);
    return { data: data as Appointment[], count: count || 0 };
  },

  async getById(id: string) {
    const { data, error } = await supabaseAdmin
      .from('appointments')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw new Error(error.message);
    return data as Appointment;
  },

  async create(appointment: Omit<Appointment, 'id' | 'created_at' | 'sync_status'>) {
    const { data, error } = await supabaseAdmin
      .from('appointments')
      .insert([{ ...appointment, sync_status: 'synced' }])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Appointment;
  },

  async update(id: string, updates: Partial<Appointment>) {
    const { data, error } = await supabaseAdmin
      .from('appointments')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data as Appointment;
  },

  async delete(id: string) {
    const { error } = await supabaseAdmin
      .from('appointments')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
    return true;
  },
};
