import { ApiResponse, PaginatedResponse, Branch } from '@/types';

class BranchService {
  async getBranches(
    page: number = 1,
    limit: number = 10,
    type?: string
  ): Promise<ApiResponse<PaginatedResponse<Branch>>> {
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        ...(type && { type }),
      });

      const response = await fetch(`/api/branches?${params}`);
      return await response.json();
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch branches',
        error: 'Failed to fetch branches',
      };
    }
  }

  async getBranchById(id: string): Promise<ApiResponse<Branch>> {
    try {
      const response = await fetch(`/api/branches/${id}`);
      return await response.json();
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch branch',
        error: 'Failed to fetch branch',
      };
    }
  }

  async createBranch(data: Partial<Branch>): Promise<ApiResponse<Branch>> {
    try {
      const response = await fetch('/api/branches', {
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
        message: 'Failed to create branch',
        error: 'Failed to create branch',
      };
    }
  }

  async updateBranch(id: string, data: Partial<Branch>): Promise<ApiResponse<Branch>> {
    try {
      const response = await fetch(`/api/branches/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      return await response.json();
    } catch (error) {
      return {
        success: false,
        message: 'Failed to update branch',
        error: 'Failed to update branch',
      };
    }
  }

  async deleteBranch(id: string): Promise<ApiResponse<void>> {
    try {
      const response = await fetch(`/api/branches/${id}`, {
        method: 'DELETE',
      });

      return await response.json();
    } catch (error) {
      return {
        success: false,
        message: 'Failed to delete branch',
        error: 'Failed to delete branch',
      };
    }
  }

  async getDashboardStats(): Promise<ApiResponse<any>> {
    try {
      const response = await fetch('/api/branches/dashboard-stats');
      return await response.json();
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch branch stats',
        error: 'Failed to fetch branch stats',
      };
    }
  }
}

export default new BranchService();
