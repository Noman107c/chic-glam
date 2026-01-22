// API Endpoints for Chic Glam Dashboard
// Base URL: http://localhost:3000/api

const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    LOGIN: '/api/auth/login'
  },

  // Users Management
  USERS: {
    GET_ALL: '/api/users',
    CREATE: '/api/users',
    GET_BY_ID: (id) => `/api/users/${id}`,
    UPDATE: (id) => `/api/users/${id}`,
    DELETE: (id) => `/api/users/${id}`
  },

  // Roles Management
  ROLES: {
    GET_ALL: '/api/roles',
    CREATE: '/api/roles',
    GET_BY_ID: (id) => `/api/roles/${id}`,
    UPDATE: (id) => `/api/roles/${id}`,
    DELETE: (id) => `/api/roles/${id}`
  },

  // Permissions
  PERMISSIONS: {
    GET_ALL: '/api/permissions',
    CREATE: '/api/permissions'
  },

  // Attendance
  ATTENDANCE: {
    GET_ALL: (limit = 100, offset = 0) => `/api/attendance?limit=${limit}&offset=${offset}`,
    CREATE: '/api/attendance'
  },

  // Staff Attendance
  STAFF_ATTENDANCE: {
    GET_HISTORY: (userId, action = 'history') => `/api/staff/attendance?userId=${userId}&action=${action}`,
    CHECK_IN: '/api/staff/attendance',
    CHECK_OUT: '/api/staff/attendance'
  },

  // Staff Salary
  STAFF_SALARY: {
    CALCULATE: (userId, month, year) => `/api/staff/salary?userId=${userId}&action=calculate&month=${month}&year=${year}`,
    GET_HISTORY: (userId) => `/api/staff/salary?userId=${userId}&action=history`,
    PROCESS: '/api/staff/salary'
  },

  // Expenses
  EXPENSES: {
    GET_ALL: (limit = 100, offset = 0) => `/api/expenses?limit=${limit}&offset=${offset}`,
    CREATE: '/api/expenses',
    UPDATE: (id) => `/api/expenses/${id}`,
    DELETE: (id) => `/api/expenses/${id}`
  },

  // Payments
  PAYMENTS: {
    GET_ALL: (limit = 100, offset = 0) => `/api/payments?limit=${limit}&offset=${offset}`,
    CREATE: '/api/payments',
    UPDATE: (id) => `/api/payments/${id}`,
    DELETE: (id) => `/api/payments/${id}`
  },

  // Services (Salon/Gym Services)
  SERVICES: {
    GET_ALL: '/api/services',
    CREATE: '/api/services',
    UPDATE: (id) => `/api/services/${id}`,
    DELETE: (id) => `/api/services/${id}`
  },

  // Appointments
  APPOINTMENTS: {
    GET_ALL: (limit = 100, offset = 0) => `/api/appointments?limit=${limit}&offset=${offset}`,
    CREATE: '/api/appointments',
    UPDATE: (id) => `/api/appointments/${id}`,
    DELETE: (id) => `/api/appointments/${id}`
  }
};

// Export for use in other files
module.exports = API_ENDPOINTS;

// Example usage:
// const endpoints = require('./api-endpoints');
// console.log(endpoints.USERS.GET_ALL); // '/api/users'
// console.log(endpoints.USERS.GET_BY_ID('123')); // '/api/users/123'
// console.log(endpoints.ATTENDANCE.GET_ALL(50, 0)); // '/api/attendance?limit=50&offset=0'
