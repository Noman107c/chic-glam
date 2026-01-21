'use client';

import { User } from '@/lib/database';

const API_BASE = '/api';

export const usersApi = {
  async getAll(): Promise<{ success: boolean; data: User[] }> {
    const res = await fetch(`${API_BASE}/users`);
    return res.json();
  },

  async getById(id: string): Promise<{ success: boolean; data: User }> {
    const res = await fetch(`${API_BASE}/users/${id}`);
    return res.json();
  },

  async create(user: Omit<User, 'id' | 'created_at'>): Promise<{ success: boolean; data: User }> {
    const res = await fetch(`${API_BASE}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    return res.json();
  },

  async update(id: string, user: Partial<User>): Promise<{ success: boolean; data: User }> {
    const res = await fetch(`${API_BASE}/users/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user),
    });
    return res.json();
  },

  async delete(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`${API_BASE}/users/${id}`, { method: 'DELETE' });
    return res.json();
  },
};

export const rolesApi = {
  async getAll(): Promise<{ success: boolean; data: any[] }> {
    const res = await fetch(`${API_BASE}/roles`);
    return res.json();
  },

  async getById(id: string): Promise<{ success: boolean; data: any }> {
    const res = await fetch(`${API_BASE}/roles/${id}`);
    return res.json();
  },

  async create(role: any): Promise<{ success: boolean; data: any }> {
    const res = await fetch(`${API_BASE}/roles`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(role),
    });
    return res.json();
  },

  async update(id: string, role: any): Promise<{ success: boolean; data: any }> {
    const res = await fetch(`${API_BASE}/roles/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(role),
    });
    return res.json();
  },

  async delete(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`${API_BASE}/roles/${id}`, { method: 'DELETE' });
    return res.json();
  },
};

export const attendanceApi = {
  async getAll(limit = 100, offset = 0): Promise<{ success: boolean; data: any[]; count: number }> {
    const res = await fetch(`${API_BASE}/attendance?limit=${limit}&offset=${offset}`);
    return res.json();
  },

  async checkIn(customerName: string): Promise<{ success: boolean; data: any }> {
    const res = await fetch(`${API_BASE}/attendance`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'check-in', customerName }),
    });
    return res.json();
  },

  async checkOut(attendanceId: string): Promise<{ success: boolean; data: any }> {
    const res = await fetch(`${API_BASE}/attendance`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'check-out', attendanceId }),
    });
    return res.json();
  },
};

export const expensesApi = {
  async getAll(limit = 100, offset = 0): Promise<{ success: boolean; data: any[]; count: number }> {
    const res = await fetch(`${API_BASE}/expenses?limit=${limit}&offset=${offset}`);
    return res.json();
  },

  async create(expense: any): Promise<{ success: boolean; data: any }> {
    const res = await fetch(`${API_BASE}/expenses`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expense),
    });
    return res.json();
  },

  async update(id: string, expense: any): Promise<{ success: boolean; data: any }> {
    const res = await fetch(`${API_BASE}/expenses/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expense),
    });
    return res.json();
  },

  async delete(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`${API_BASE}/expenses/${id}`, { method: 'DELETE' });
    return res.json();
  },
};

export const paymentsApi = {
  async getAll(limit = 100, offset = 0): Promise<{ success: boolean; data: any[]; count: number }> {
    const res = await fetch(`${API_BASE}/payments?limit=${limit}&offset=${offset}`);
    return res.json();
  },

  async create(payment: any): Promise<{ success: boolean; data: any }> {
    const res = await fetch(`${API_BASE}/payments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payment),
    });
    return res.json();
  },

  async update(id: string, payment: any): Promise<{ success: boolean; data: any }> {
    const res = await fetch(`${API_BASE}/payments/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payment),
    });
    return res.json();
  },

  async delete(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`${API_BASE}/payments/${id}`, { method: 'DELETE' });
    return res.json();
  },
};

export const servicesApi = {
  async getAll(): Promise<{ success: boolean; data: any[] }> {
    const res = await fetch(`${API_BASE}/services`);
    return res.json();
  },

  async create(service: any): Promise<{ success: boolean; data: any }> {
    const res = await fetch(`${API_BASE}/services`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(service),
    });
    return res.json();
  },

  async update(id: string, service: any): Promise<{ success: boolean; data: any }> {
    const res = await fetch(`${API_BASE}/services/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(service),
    });
    return res.json();
  },

  async delete(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`${API_BASE}/services/${id}`, { method: 'DELETE' });
    return res.json();
  },
};

export const appointmentsApi = {
  async getAll(limit = 100, offset = 0): Promise<{ success: boolean; data: any[]; count: number }> {
    const res = await fetch(`${API_BASE}/appointments?limit=${limit}&offset=${offset}`);
    return res.json();
  },

  async create(appointment: any): Promise<{ success: boolean; data: any }> {
    const res = await fetch(`${API_BASE}/appointments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appointment),
    });
    return res.json();
  },

  async update(id: string, appointment: any): Promise<{ success: boolean; data: any }> {
    const res = await fetch(`${API_BASE}/appointments/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(appointment),
    });
    return res.json();
  },

  async delete(id: string): Promise<{ success: boolean }> {
    const res = await fetch(`${API_BASE}/appointments/${id}`, { method: 'DELETE' });
    return res.json();
  },
};
