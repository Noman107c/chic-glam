// Constants for the dashboard application

// API Constants
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

// Role Constants
export const ROLES = {
  SUPER_ADMIN: 'Super Admin',
    BRANCH_ADMIN: 'Branch Admin',
  SALON_MANAGER: 'Salon Manager',
  GYM_MANAGER: 'Gym Manager',
  TRAINER: 'Trainer',
  BEAUTICIAN: 'Beautician',
  RECEPTIONIST: 'Receptionist',
  ACCOUNTANT: 'Accountant',
  MEMBER: 'Member',
} as const;

export const ROLE_PERMISSIONS = {
  [ROLES.SUPER_ADMIN]: [
    'users.create', 'users.read', 'users.update', 'users.delete',
    'roles.create', 'roles.read', 'roles.update', 'roles.delete',
    'branches.create', 'branches.read', 'branches.update', 'branches.delete',
    'finance.read', 'finance.create', 'finance.update', 'finance.delete',
    'reports.read', 'reports.export',
    'settings.update', 'settings.read',
  ],
  [ROLES.BRANCH_ADMIN]: [
    'users.read', 'users.update',
    'branches.read', 'branches.update',
    'finance.read', 'finance.create',
    'reports.read',
  ],
  [ROLES.SALON_MANAGER]: [
    'users.read',
    'branches.read',
    'finance.read',
    'reports.read',
  ],
  [ROLES.GYM_MANAGER]: [
    'users.read',
    'branches.read',
    'finance.read',
    'reports.read',
  ],
  [ROLES.TRAINER]: [
    'users.read',
    'branches.read',
  ],
  [ROLES.BEAUTICIAN]: [
    'users.read',
    'branches.read',
  ],
  [ROLES.RECEPTIONIST]: [
    'users.read',
    'branches.read',
    'finance.read',
  ],
  [ROLES.ACCOUNTANT]: [
    'finance.read', 'finance.create', 'finance.update', 'finance.delete',
    'reports.read', 'reports.export',
  ],
  [ROLES.MEMBER]: [
    'profile.read', 'profile.update',
    'bookings.create', 'bookings.read', 'bookings.update',
  ],
} as const;

// Branch Types
export const BRANCH_TYPES = {
  SALON: 'salon',
  GYM: 'gym',
} as const;

// Service Categories
export const SERVICE_CATEGORIES = {
  HAIR: 'Hair Care',
  SKIN: 'Skin Care',
  NAILS: 'Nails',
  MAKEUP: 'Makeup',
  MASSAGE: 'Massage',
  FACIAL: 'Facial',
  WAXING: 'Waxing',
  GYM_WORKOUT: 'Gym Workout',
  PERSONAL_TRAINING: 'Personal Training',
  GROUP_CLASSES: 'Group Classes',
  CARDIO: 'Cardio',
  STRENGTH: 'Strength Training',
  YOGA: 'Yoga',
  PILATES: 'Pilates',
  ZUMBA: 'Zumba',
} as const;

// Membership Types
export const MEMBERSHIP_TYPES = {
  MONTHLY: 'monthly',
  YEARLY: 'yearly',
  CORPORATE: 'corporate',
  FAMILY: 'family',
} as const;

// Payment Methods
export const PAYMENT_METHODS = {
  CASH: 'Cash',
  CARD: 'Card',
  ONLINE: 'Online',
  BANK_TRANSFER: 'Bank Transfer',
} as const;

// Transaction Types
export const TRANSACTION_TYPES = {
  INCOME: 'income',
  EXPENSE: 'expense',
} as const;

// Transaction Categories
export const TRANSACTION_CATEGORIES = {
  // Income
  MEMBERSHIP_FEES: 'Membership Fees',
  SERVICE_CHARGES: 'Service Charges',
  PRODUCT_SALES: 'Product Sales',

  // Expenses
  SALARY: 'Salary',
  RENT: 'Rent',
  UTILITIES: 'Utilities',
  EQUIPMENT: 'Equipment',
  SUPPLIES: 'Supplies',
  MARKETING: 'Marketing',
  MAINTENANCE: 'Maintenance',
  INSURANCE: 'Insurance',
} as const;

// Booking Status
export const BOOKING_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  NO_SHOW: 'no_show',
} as const;

// Working Days
export const WORKING_DAYS = {
  MONDAY: 'monday',
  TUESDAY: 'tuesday',
  WEDNESDAY: 'wednesday',
  THURSDAY: 'thursday',
  FRIDAY: 'friday',
  SATURDAY: 'saturday',
  SUNDAY: 'sunday',
} as const;

// Time Slots
export const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
  '18:00', '18:30', '19:00', '19:30', '20:00', '20:30',
  '21:00',
];

// Chart Colors
export const CHART_COLORS = [
  '#3B82F6', // PRIMARY - Blue
  '#10B981', // SECONDARY - Green
  '#F59E0B', // ACCENT - Amber
  '#EF4444', // DANGER - Red
  '#F97316', // WARNING - Orange
  '#22C55E', // SUCCESS - Lime
  '#06B6D4', // INFO - Cyan
  '#6B7280', // GRAY
] as const;

export const CHART_COLOR_MAP = {
  PRIMARY: '#3B82F6',
  SECONDARY: '#10B981',
  ACCENT: '#F59E0B',
  DANGER: '#EF4444',
  WARNING: '#F97316',
  SUCCESS: '#22C55E',
  INFO: '#06B6D4',
  GRAY: '#6B7280',
} as const;

// Pagination
export const PAGINATION_LIMITS = [10, 25, 50, 100] as const;
export const DEFAULT_PAGE_SIZE = 25;

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: 'MMM DD, YYYY',
  API: 'YYYY-MM-DD',
  TIME: 'HH:mm',
  DATETIME: 'MMM DD, YYYY HH:mm',
} as const;

// File Upload
export const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'] as const;

// Notification Types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
} as const;

// Theme Colors
export const THEME_COLORS = {
  LIGHT: {
    background: '#FFFFFF',
    foreground: '#000000',
    primary: '#3B82F6',
    secondary: '#F1F5F9',
    accent: '#F59E0B',
    muted: '#F8FAFC',
    border: '#E2E8F0',
  },
  DARK: {
    background: '#0F172A',
    foreground: '#F8FAFC',
    primary: '#3B82F6',
    secondary: '#1E293B',
    accent: '#F59E0B',
    muted: '#1E293B',
    border: '#334155',
  },
} as const;

// Status Colors
export const STATUS_COLORS = {
  ACTIVE: '#22C55E',
  INACTIVE: '#EF4444',
  PENDING: '#F59E0B',
  COMPLETED: '#10B981',
  CANCELLED: '#6B7280',
} as const;

// Priority Levels
export const PRIORITY_LEVELS = {
  LOW: 'low',
  MEDIUM: 'medium',
  HIGH: 'high',
  URGENT: 'urgent',
} as const;

// Currency
export const DEFAULT_CURRENCY = 'PKR';
export const CURRENCY_SYMBOLS = {
  PKR: '₨',
  USD: '$',
  EUR: '€',
  GBP: '£',
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  USER_DATA: 'user_data',
  THEME: 'theme',
  LANGUAGE: 'language',
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    PROFILE: '/auth/profile',
  },
  USERS: '/users',
  ROLES: '/roles',
  PERMISSIONS: '/permissions',
  BRANCHES: '/branches',
  SERVICES: '/services',
  MEMBERSHIPS: '/memberships',
  BOOKINGS: '/bookings',
  TRANSACTIONS: '/transactions',
  REPORTS: '/reports',
  SETTINGS: '/settings',
} as const;

// Validation Rules
export const VALIDATION_RULES = {
  PASSWORD_MIN_LENGTH: 8,
  NAME_MAX_LENGTH: 100,
  EMAIL_MAX_LENGTH: 255,
  PHONE_MAX_LENGTH: 20,
  ADDRESS_MAX_LENGTH: 500,
  DESCRIPTION_MAX_LENGTH: 1000,
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  REQUIRED: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Please enter a valid phone number',
  PASSWORD_TOO_SHORT: 'Password must be at least 8 characters long',
  PASSWORDS_NOT_MATCH: 'Passwords do not match',
  INVALID_DATE: 'Please enter a valid date',
  INVALID_TIME: 'Please enter a valid time',
  FILE_TOO_LARGE: 'File size must be less than 5MB',
  INVALID_FILE_TYPE: 'Please select a valid image file',
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  SAVED: 'Changes saved successfully',
  DELETED: 'Item deleted successfully',
  CREATED: 'Item created successfully',
  UPDATED: 'Item updated successfully',
  UPLOADED: 'File uploaded successfully',
} as const;
