import { ApiResponse, PaginatedResponse, Transaction, Invoice, Expense, Salary } from '@/types';

class FinanceService {
  async getTransactions(
    page: number = 1,
    limit: number = 10
  ): Promise<ApiResponse<PaginatedResponse<Transaction>>> {
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
      });

      const response = await fetch(`/api/finance/transactions?${params}`);
      return await response.json();
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch transactions',
        error: 'Failed to fetch transactions',
      };
    }
  }

  async getInvoices(
    page: number = 1,
    limit: number = 10
  ): Promise<ApiResponse<PaginatedResponse<Invoice>>> {
    try {
      const response = await fetch(`/api/finance/invoices?page=${page}&limit=${limit}`);
      return await response.json();
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch invoices',
        error: 'Failed to fetch invoices',
      };
    }
  }

  async createInvoice(data: Partial<Invoice>): Promise<ApiResponse<Invoice>> {
    try {
      const response = await fetch('/api/finance/invoices', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      return await response.json();
    } catch (error) {
      return {
        success: false,
        message: 'Failed to create invoice',
        error: 'Failed to create invoice',
      };
    }
  }

  async getExpenses(
    page: number = 1,
    limit: number = 10
  ): Promise<ApiResponse<PaginatedResponse<Expense>>> {
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
      });

      const response = await fetch(`/api/finance/expenses?${params}`);
      return await response.json();
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch expenses',
        error: 'Failed to fetch expenses',
      };
    }
  }

  async createExpense(data: Partial<Expense>): Promise<ApiResponse<Expense>> {
    try {
      const response = await fetch('/api/finance/expenses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      return await response.json();
    } catch (error) {
      return {
        success: false,
        message: 'Failed to create expense',
        error: 'Failed to create expense',
      };
    }
  }

  async getSalaries(
    page: number = 1,
    limit: number = 10
  ): Promise<ApiResponse<PaginatedResponse<Salary>>> {
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
      });

      const response = await fetch(`/api/finance/salaries?${params}`);
      return await response.json();
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch salaries',
        error: 'Failed to fetch salaries',
      };
    }
  }

  async getDashboardStats(): Promise<ApiResponse<any>> {
    try {
      const response = await fetch('/api/finance/dashboard-stats');
      return await response.json();
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch financial stats',
        error: 'Failed to fetch financial stats',
      };
    }
  }
}

export default new FinanceService();
