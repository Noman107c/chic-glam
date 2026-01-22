import {
  DashboardStats,
  RevenueData,
  BranchPerformance,
  ChartData,
  User,
  Branch,
  Role,
} from '@/types';

// Extended interfaces for mock data
interface Permission {
  id: string;
  name: string;
}

interface Attendance {
  id: string;
  customer_name: string;
  check_in: string;
  check_out?: string;
  sync_status: string;
}

interface Expense {
  id: string;
  title: string;
  amount: number;
  sync_status: string;
  created_at: string;
}

interface Payment {
  id: string;
  customer_name: string;
  amount: number;
  payment_method: string;
  status: string;
  sync_status: string;
  created_at: string;
}

interface Service {
  id: string;
  name: string;
  price: number;
  duration_minutes?: number;
  created_at: string;
}

interface Appointment {
  id: string;
  customer_name: string;
  service_id: string;
  trainer_id: string;
  appointment_time: string;
  status: string;
  sync_status: string;
  created_at: string;
}

export const mockDashboardStats: DashboardStats = {
  totalSalons: 5,
  totalGyms: 3,
  totalBranches: 8,
  totalActiveMembers: 1240,
  totalStaff: 45,
  todayRevenue: 12500,
  monthlyRevenue: 285000,
  pendingPayments: 15000,
};

export const mockRevenueData: RevenueData[] = [
  { date: 'Jan 1', revenue: 24000, expenses: 14000, profit: 10000 },
  { date: 'Jan 2', revenue: 18000, expenses: 12000, profit: 6000 },
  { date: 'Jan 3', revenue: 22000, expenses: 13000, profit: 9000 },
  { date: 'Jan 4', revenue: 26000, expenses: 14000, profit: 12000 },
  { date: 'Jan 5', revenue: 20000, expenses: 11000, profit: 9000 },
  { date: 'Jan 6', revenue: 28000, expenses: 15000, profit: 13000 },
  { date: 'Jan 7', revenue: 25000, expenses: 14000, profit: 11000 },
];

export const mockComparisonData = [
  { name: 'Week 1', salonRevenue: 45000, gymRevenue: 35000 },
  { name: 'Week 2', salonRevenue: 52000, gymRevenue: 42000 },
  { name: 'Week 3', salonRevenue: 48000, gymRevenue: 38000 },
  { name: 'Week 4', salonRevenue: 61000, gymRevenue: 49000 },
];

export const mockMembershipData = [
  { month: 'Jan', activeMembers: 980 },
  { month: 'Feb', activeMembers: 1050 },
  { month: 'Mar', activeMembers: 1120 },
  { month: 'Apr', activeMembers: 1180 },
  { month: 'May', activeMembers: 1240 },
];

export const mockBranchPerformance: BranchPerformance[] = [
  {
    branchId: '1',
    branchName: 'Downtown Salon',
    revenue: 65000,
    expenses: 35000,
    profit: 30000,
    memberCount: 250,
    bookingCount: 450,
    bookings: 450,
    rating: 4.8,
    growth: 12.5,
  },
  {
    branchId: '2',
    branchName: 'Downtown Gym',
    revenue: 55000,
    expenses: 28000,
    profit: 27000,
    memberCount: 180,
    bookingCount: 320,
    bookings: 320,
    rating: 4.6,
    growth: 8.3,
  },
  {
    branchId: '3',
    branchName: 'Uptown Salon',
    revenue: 48000,
    expenses: 30000,
    profit: 18000,
    memberCount: 160,
    bookingCount: 280,
    bookings: 280,
    rating: 4.5,
    growth: 6.7,
  },
  {
    branchId: '4',
    branchName: 'Uptown Gym',
    revenue: 52000,
    expenses: 26000,
    profit: 26000,
    memberCount: 220,
    bookingCount: 380,
    bookings: 380,
    rating: 4.7,
    growth: 10.2,
  },
];

// Mock Permissions Data
export const mockPermissions: Permission[] = [
  { id: '1', name: 'users.create' },
  { id: '2', name: 'users.read' },
  { id: '3', name: 'users.update' },
  { id: '4', name: 'users.delete' },
  { id: '5', name: 'roles.create' },
  { id: '6', name: 'roles.read' },
  { id: '7', name: 'roles.update' },
  { id: '8', name: 'roles.delete' },
  { id: '9', name: 'permissions.read' },
  { id: '10', name: 'attendance.create' },
  { id: '11', name: 'attendance.read' },
  { id: '12', name: 'services.read' },
  { id: '13', name: 'services.create' },
  { id: '14', name: 'booking.create' },
  { id: '15', name: 'booking.read' },
  { id: '16', name: 'booking.update' },
  { id: '17', name: 'payments.create' },
  { id: '18', name: 'payments.read' },
];

// Mock Roles Data
export const mockRoles: Role[] = [
  {
    id: '1',
    name: 'trainer',
    description: 'Fitness trainer with access to gym facilities and client management',
    permissions: ['user.read', 'booking.create', 'booking.read', 'booking.update', 'attendance.create', 'attendance.read'],
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: 'beautician',
    description: 'Beauty specialist with access to salon services and client appointments',
    permissions: ['user.read', 'booking.create', 'booking.read', 'booking.update', 'services.read', 'attendance.create', 'attendance.read'],
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '3',
    name: 'admin',
    description: 'Administrator with full system access',
    permissions: ['users.create', 'users.read', 'users.update', 'users.delete', 'roles.create', 'roles.read', 'roles.update', 'roles.delete', 'permissions.read', 'attendance.create', 'attendance.read', 'services.read', 'services.create', 'booking.create', 'booking.read', 'booking.update', 'payments.create', 'payments.read'],
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '4',
    name: 'manager',
    description: 'Branch manager with operational oversight',
    permissions: ['users.read', 'users.update', 'attendance.read', 'services.read', 'booking.read', 'booking.update', 'payments.read'],
    createdAt: new Date('2024-01-01'),
  },
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Super Admin',
    firstName: 'Super',
    lastName: 'Admin',
    email: 'noman@gmail.com',
    phone: '+92 300 1234567',
    role: 'admin' as any,
    isActive: true,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'John Trainer',
    firstName: 'John',
    lastName: 'Trainer',
    email: 'trainer@chicglam.com',
    phone: '+92 300 2345678',
    role: 'trainer' as any,
    branchId: '2',
    isActive: true,
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date(),
  },
  {
    id: '3',
    name: 'Sarah Beautician',
    firstName: 'Sarah',
    lastName: 'Beautician',
    email: 'beautician@chicglam.com',
    phone: '+92 300 3456789',
    role: 'beautician' as any,
    branchId: '1',
    isActive: true,
    createdAt: new Date('2024-01-02'),
    updatedAt: new Date(),
  },
  {
    id: '4',
    name: 'Mike Trainer',
    firstName: 'Mike',
    lastName: 'Trainer',
    email: 'trainer2@chicglam.com',
    phone: '+92 300 4567890',
    role: 'trainer' as any,
    branchId: '4',
    isActive: true,
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date(),
  },
  {
    id: '5',
    name: 'Emma Beautician',
    firstName: 'Emma',
    lastName: 'Beautician',
    email: 'beautician2@chicglam.com',
    phone: '+92 300 5678901',
    role: 'beautician' as any,
    branchId: '3',
    isActive: true,
    createdAt: new Date('2024-01-03'),
    updatedAt: new Date(),
  },
];

export const mockBranches: Branch[] = [
  {
    id: '1',
    name: 'Downtown Salon',
    type: 'SALON',
    address: '123 Main St',
    city: 'Karachi',
    state: 'Sindh',
    zipCode: '75000',
    phone: '+92 21 1234567',
    email: 'downtown@chicglam.com',
    managerId: '2',
    workingHours: {
      monday: { open: '10:00', close: '22:00', isClosed: false },
      tuesday: { open: '10:00', close: '22:00', isClosed: false },
      wednesday: { open: '10:00', close: '22:00', isClosed: false },
      thursday: { open: '10:00', close: '22:00', isClosed: false },
      friday: { open: '10:00', close: '23:00', isClosed: false },
      saturday: { open: '09:00', close: '23:00', isClosed: false },
      sunday: { open: '09:00', close: '22:00', isClosed: false },
    },
    services: [],
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
