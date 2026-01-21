import {
  DashboardStats,
  RevenueData,
  BranchPerformance,
  ChartData,
  User,
  Branch,
  Role,
} from '@/types';

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

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Ahmed Khan',
    firstName: 'Ahmed',
    lastName: 'Khan',
    email: 'ahmed@example.com',
    phone: '+92 300 1234567',
    role: 'SUPER_ADMIN' as any,
    isActive: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    name: 'Fatima Ali',
    firstName: 'Fatima',
    lastName: 'Ali',
    email: 'fatima@example.com',
    phone: '+92 300 7654321',
    role: 'BRANCH_ADMIN' as any,
    branchId: '1',
    isActive: true,
    createdAt: new Date(),
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
