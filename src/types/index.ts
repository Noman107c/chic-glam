// Core Types
export interface User {
  id: string;
  name: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone?: string;
  role: Role | string;
  branchId?: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

export interface Role {
  id: string;
  name: string;
  permissions: string[];
  description?: string;
  createdAt: Date;
  updatedAt?: Date;
  isActive?: boolean;
}

export interface Permission {
  id: string;
  name: string;
  resource?: string;
  action?: 'create' | 'read' | 'update' | 'delete';
}

// Permission constants for use in forms
export const PERMISSION_LIST = [
  { id: '1', name: 'user.create' },
  { id: '2', name: 'user.read' },
  { id: '3', name: 'user.update' },
  { id: '4', name: 'user.delete' },
  { id: '5', name: 'role.create' },
  { id: '6', name: 'role.read' },
  { id: '7', name: 'role.update' },
  { id: '8', name: 'role.delete' },
  { id: '9', name: 'booking.create' },
  { id: '10', name: 'booking.read' },
  { id: '11', name: 'booking.update' },
  { id: '12', name: 'booking.delete' },
  { id: '13', name: 'finance.read' },
  { id: '14', name: 'finance.write' },
  { id: '15', name: 'reports.read' },
  { id: '16', name: 'settings.manage' },
]

export interface Branch {
  id: string;
  name: string;
  type: 'SALON' | 'GYM' | 'BOTH';
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  email: string;
  managerId?: string;
  workingHours: WorkingHours;
  services: Service[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface WorkingHours {
  monday: TimeSlot;
  tuesday: TimeSlot;
  wednesday: TimeSlot;
  thursday: TimeSlot;
  friday: TimeSlot;
  saturday: TimeSlot;
  sunday: TimeSlot;
}

export interface TimeSlot {
  open: string;
  close: string;
  isClosed: boolean;
}

export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  duration: number; // in minutes
  category: string;
  branchId: string;
  isActive: boolean;
}

export interface Membership {
  id: string;
  name: string;
  type: 'monthly' | 'yearly' | 'corporate' | 'family';
  price: number;
  duration: number; // in months
  features: string[];
  branchId: string;
  isActive: boolean;
}

export interface Booking {
  id: string;
  userId: string;
  serviceId: string;
  branchId: string;
  staffId: string;
  date: Date;
  startTime: string;
  endTime: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  createdAt: Date;
}

export interface Staff {
  id: string;
  userId: string;
  branchId: string;
  position: string;
  salary: number;
  commission: number;
  workingHours: WorkingHours;
  isActive: boolean;
}

export interface Transaction {
  id: string;
  type: 'income' | 'expense';
  amount: number;
  description: string;
  category: string;
  branchId: string;
  userId?: string;
  date: Date;
  paymentMethod: string;
  createdAt?: Date;
}

export interface DashboardStats {
  totalSalons: number;
  totalGyms: number;
  totalBranches: number;
  totalActiveMembers: number;
  totalStaff: number;
  todayRevenue: number;
  monthlyRevenue: number;
  pendingPayments: number;
}

export interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string;
    borderColor?: string;
  }[];
}

// API Response Types
export interface ApiResponse<T> {
  data?: T;
  message: string;
  success: boolean;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Form Types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface BranchForm {
  name: string;
  type: 'salon' | 'gym';
  address: string;
  phone: string;
  email: string;
  managerId?: string;
}

export interface ServiceForm {
  name: string;
  description: string;
  price: number;
  duration: number;
  category: string;
}

export interface UserForm {
  name: string;
  email: string;
  roleId: string;
  branchId?: string;
}

export interface RoleForm {
  name: string;
  description?: string;
  permissions: string[];
}

// Additional Types
export interface Invoice {
  id: string;
  invoiceNumber: string;
  transactionId: string;
  customerId: string;
  branchId: string;
  items: any[];
  subtotal: number;
  tax: number;
  discount: number;
  total: number;
  status: 'paid' | 'pending' | 'overdue';
  paymentStatus: string;
  dueDate: Date;
  issueDate: Date;
  paidDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface Expense {
  id: string;
  category: string;
  amount: number;
  description: string;
  date: Date;
  branchId: string;
  approvedBy?: string;
  createdAt: Date;
}

export interface Salary {
  id: string;
  userId: string;
  amount: number;
  month: number;
  year: number;
  bonuses: number;
  deductions: number;
  netSalary: number;
  status: 'paid' | 'pending';
  createdAt: Date;
}

export interface RevenueData {
  date: string;
  revenue: number;
  expenses: number;
  profit: number;
}

export interface BranchPerformance {
  branchId: string;
  branchName: string;
  revenue: number;
  bookings: number;
  rating: number;
  growth: number;
  profit: number;
  bookingCount: number;
  expenses: number;
  memberCount: number;
}

export type UserRole = 'admin' | 'manager' | 'staff' | 'customer';

export type TransactionType = 'income' | 'expense';

export type Theme = 'light' | 'dark';

export interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}
