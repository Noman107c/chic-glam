import { supabaseClient } from '@/lib/supabaseClient';

export interface Customer {
  id: string;
  name: string;
  phone: string;
  assigned_staff_id: string;
  created_at: string;
}

export interface Sale {
  id: string;
  staff_id: string;
  customer_id: string;
  amount: number;
  service_type: string;
  sale_date: string;
  created_at: string;
}

export const salesService = {
  // Create customer
  async createCustomer(customerData: Omit<Customer, 'id' | 'created_at'>): Promise<Customer> {
    const { data, error } = await supabaseClient
      .from('customers')
      .insert([customerData])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  // Get customers for staff
  async getCustomersForStaff(staffId: string): Promise<Customer[]> {
    const { data, error } = await supabaseClient
      .from('customers')
      .select('*')
      .eq('assigned_staff_id', staffId)
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data || [];
  },

  // Get all customers (for super admin)
  async getAllCustomers(): Promise<Customer[]> {
    const { data, error } = await supabaseClient
      .from('customers')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data || [];
  },

  // Create sale
  async createSale(saleData: Omit<Sale, 'id' | 'created_at'>): Promise<Sale> {
    const { data, error } = await supabaseClient
      .from('sales')
      .insert([saleData])
      .select()
      .single();

    if (error) throw new Error(error.message);

    // TODO: Store in IndexedDB for offline support
    // await storeSaleLocally(data);

    return data;
  },

  // Get sales for staff
  async getSalesForStaff(staffId: string, limit = 50, offset = 0): Promise<Sale[]> {
    const { data, error } = await supabaseClient
      .from('sales')
      .select(`
        *,
        customers!inner(name, phone)
      `)
      .eq('staff_id', staffId)
      .order('sale_date', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw new Error(error.message);
    return data || [];
  },

  // Get all sales (for super admin)
  async getAllSales(limit = 100, offset = 0): Promise<Sale[]> {
    const { data, error } = await supabaseClient
      .from('sales')
      .select(`
        *,
        customers!inner(name, phone),
        users!inner(name, email)
      `)
      .order('sale_date', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) throw new Error(error.message);
    return data || [];
  },

  // Get sales stats for dashboard
  async getSalesStats(staffId?: string): Promise<{
    totalSales: number;
    totalRevenue: number;
    todaySales: number;
    todayRevenue: number;
    monthlyRevenue: number;
  }> {
    let query = supabaseClient.from('sales').select('*');

    if (staffId) {
      query = query.eq('staff_id', staffId);
    }

    const { data, error } = await query;

    if (error) throw new Error(error.message);

    const sales = data || [];
    const today = new Date().toISOString().split('T')[0];
    const thisMonth = new Date().toISOString().slice(0, 7);

    const todaySales = sales.filter((s: any) => s.sale_date.startsWith(today));
    const monthlySales = sales.filter((s: any) => s.sale_date.startsWith(thisMonth));

    return {
      totalSales: sales.length,
      totalRevenue: sales.reduce((sum: number, s: any) => sum + s.amount, 0),
      todaySales: todaySales.length,
      todayRevenue: todaySales.reduce((sum: number, s: any) => sum + s.amount, 0),
      monthlyRevenue: monthlySales.reduce((sum: number, s: any) => sum + s.amount, 0),
    };
  },

  // Update customer
  async updateCustomer(id: string, updates: Partial<Customer>): Promise<Customer> {
    const { data, error } = await supabaseClient
      .from('customers')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  // Delete customer
  async deleteCustomer(id: string): Promise<void> {
    const { error } = await supabaseClient
      .from('customers')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
  },
};
