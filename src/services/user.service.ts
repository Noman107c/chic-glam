import { ApiResponse, PaginatedResponse, User, Role, Permission } from '@/types';

class UserService {
  async getUsers(
    page: number = 1,
    limit: number = 10,
    role?: string
  ): Promise<ApiResponse<PaginatedResponse<User>>> {
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
        ...(role && { role }),
      });

      const response = await fetch(`/api/users?${params}`);
      return await response.json();
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch users',
        error: 'Failed to fetch users',
      };
    }
  }

  async getUserById(id: string): Promise<ApiResponse<User>> {
    try {
      const response = await fetch(`/api/users/${id}`);
      return await response.json();
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch user',
        error: 'Failed to fetch user',
      };
    }
  }

  async createUser(data: Partial<User>): Promise<ApiResponse<User>> {
    try {
      const response = await fetch('/api/users', {
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
        message: 'Failed to create user',
        error: 'Failed to create user',
      };
    }
  }

  async updateUser(id: string, data: Partial<User>): Promise<ApiResponse<User>> {
    try {
      const response = await fetch(`/api/users/${id}`, {
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
        message: 'Failed to update user',
        error: 'Failed to update user',
      };
    }
  }

  async deleteUser(id: string): Promise<ApiResponse<void>> {
    try {
      const response = await fetch(`/api/users/${id}`, {
        method: 'DELETE',
      });

      return await response.json();
    } catch (error) {
      return {
        success: false,
        message: 'Failed to delete user',
        error: 'Failed to delete user',
      };
    }
  }

  // Role Management
  async getRoles(page: number = 1, limit: number = 10): Promise<ApiResponse<PaginatedResponse<Role>>> {
    try {
      const response = await fetch(`/api/roles?page=${page}&limit=${limit}`);
      return await response.json();
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch roles',
        error: 'Failed to fetch roles',
      };
    }
  }

  async getRoleById(id: string): Promise<ApiResponse<Role>> {
    try {
      const response = await fetch(`/api/roles/${id}`);
      return await response.json();
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch role',
        error: 'Failed to fetch role',
      };
    }
  }

  async createRole(data: Partial<Role>): Promise<ApiResponse<Role>> {
    try {
      const response = await fetch('/api/roles', {
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
        message: 'Failed to create role',
        error: 'Failed to create role',
      };
    }
  }

  async updateRole(id: string, data: Partial<Role>): Promise<ApiResponse<Role>> {
    try {
      const response = await fetch(`/api/roles/${id}`, {
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
        message: 'Failed to update role',
        error: 'Failed to update role',
      };
    }
  }

  async deleteRole(id: string): Promise<ApiResponse<void>> {
    try {
      const response = await fetch(`/api/roles/${id}`, {
        method: 'DELETE',
      });

      return await response.json();
    } catch (error) {
      return {
        success: false,
        message: 'Failed to delete role',
        error: 'Failed to delete role',
      };
    }
  }
}

export default new UserService();
