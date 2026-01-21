import { User, ApiResponse } from '@/types';

class AuthService {
  async login(email: string, password: string): Promise<ApiResponse<{ user: User; token: string }>> {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      return await response.json();
    } catch (error) {
      return {
        success: false,
        message: 'Failed to login',
        error: 'Failed to login',
      };
    }
  }

  async logout(): Promise<void> {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  async getCurrentUser(): Promise<ApiResponse<User>> {
    try {
      const response = await fetch('/api/auth/me');
      return await response.json();
    } catch (error) {
      return {
        success: false,
        message: 'Failed to fetch current user',
        error: 'Failed to fetch current user',
      };
    }
  }

  async updateProfile(userId: string, data: Partial<User>): Promise<ApiResponse<User>> {
    try {
      const response = await fetch(`/api/users/${userId}`, {
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
        message: 'Failed to update profile',
        error: 'Failed to update profile',
      };
    }
  }
}

export default new AuthService();
