const fetch = require('node-fetch');
const API_ENDPOINTS = require('./api-endpoints');

const BASE_URL = 'http://localhost:3001';

// Test data
const testCredentials = {
  email: 'noman@gmail.com',
  password: '123'
};

let adminToken = '';
let testUserId = '';
let testRoleId = '';
let testServiceId = '';
let testAppointmentId = '';
let testPaymentId = '';

// Helper function to make API calls
async function apiCall(endpoint, method = 'GET', body = null, token = null) {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const config = {
    method,
    headers,
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    const data = await response.json();
    return { status: response.status, data, ok: response.ok };
  } catch (error) {
    return { status: 500, error: error.message, ok: false };
  }
}

// Test logging function
function logTest(testName, result, details = '') {
  const status = result.ok ? '✅ PASS' : '❌ FAIL';
  console.log(`${status} - ${testName}`);
  if (details) console.log(`   Details: ${details}`);
  if (!result.ok) {
    console.log(`   Error: ${JSON.stringify(result.data || result.error, null, 2)}`);
  }
  console.log('');
}

// Main test function
async function runComprehensiveAPITests() {
  console.log('🚀 Starting Comprehensive API Testing for Chic Glam Dashboard');
  console.log('Server should be running on http://localhost:3000');
  console.log('=' .repeat(60));

  try {
    // 1. Test Authentication
    console.log('🔐 TESTING AUTHENTICATION');
    console.log('-'.repeat(30));

    const loginResult = await apiCall(API_ENDPOINTS.AUTH.LOGIN, 'POST', testCredentials);
    logTest('Admin Login', loginResult, `Token received: ${loginResult.ok ? 'Yes' : 'No'}`);

    if (!loginResult.ok) {
      console.log('❌ Cannot proceed without authentication. Aborting tests.');
      return;
    }

    adminToken = loginResult.data.token;
    console.log(`Admin Token: ${adminToken.substring(0, 20)}...`);

    // 2. Test Users API
    console.log('👥 TESTING USERS API');
    console.log('-'.repeat(30));

    // Get all users
    const getUsersResult = await apiCall(API_ENDPOINTS.USERS.GET_ALL, 'GET', null, adminToken);
    logTest('Get All Users', getUsersResult);

    // Create a test user
    const newUser = {
      full_name: 'Test User API',
      email: 'testuser@api.com',
      role_id: null, // Will be set after creating roles
      is_active: true
    };

    const createUserResult = await apiCall(API_ENDPOINTS.USERS.CREATE, 'POST', newUser, adminToken);
    logTest('Create User', createUserResult);

    if (createUserResult.ok) {
      testUserId = createUserResult.data.id;
    }

    // Get user by ID
    if (testUserId) {
      const getUserByIdResult = await apiCall(API_ENDPOINTS.USERS.GET_BY_ID(testUserId), 'GET', null, adminToken);
      logTest('Get User by ID', getUserByIdResult);
    }

    // 3. Test Roles API
    console.log('🎭 TESTING ROLES API');
    console.log('-'.repeat(30));

    // Get all roles
    const getRolesResult = await apiCall(API_ENDPOINTS.ROLES.GET_ALL, 'GET', null, adminToken);
    logTest('Get All Roles', getRolesResult);

    // Create a test role
    const newRole = {
      name: 'test_role',
      description: 'Test role for API testing'
    };

    const createRoleResult = await apiCall(API_ENDPOINTS.ROLES.CREATE, 'POST', newRole, adminToken);
    logTest('Create Role', createRoleResult);

    if (createRoleResult.ok) {
      testRoleId = createRoleResult.data.id;
    }

    // Get role by ID
    if (testRoleId) {
      const getRoleByIdResult = await apiCall(API_ENDPOINTS.ROLES.GET_BY_ID(testRoleId), 'GET', null, adminToken);
      logTest('Get Role by ID', getRoleByIdResult);
    }

    // 4. Test Permissions API
    console.log('🔑 TESTING PERMISSIONS API');
    console.log('-'.repeat(30));

    // Get all permissions
    const getPermissionsResult = await apiCall(API_ENDPOINTS.PERMISSIONS.GET_ALL, 'GET', null, adminToken);
    logTest('Get All Permissions', getPermissionsResult);

    // Create a test permission
    const newPermission = {
      name: 'test.permission'
    };

    const createPermissionResult = await apiCall(API_ENDPOINTS.PERMISSIONS.CREATE, 'POST', newPermission, adminToken);
    logTest('Create Permission', createPermissionResult);

    // 5. Test Services API
    console.log('💅 TESTING SERVICES API');
    console.log('-'.repeat(30));

    // Get all services
    const getServicesResult = await apiCall(API_ENDPOINTS.SERVICES.GET_ALL, 'GET', null, adminToken);
    logTest('Get All Services', getServicesResult);

    // Create a test service
    const newService = {
      name: 'Test Service API',
      price: 5000, // PKR
      duration_minutes: 30
    };

    const createServiceResult = await apiCall(API_ENDPOINTS.SERVICES.CREATE, 'POST', newService, adminToken);
    logTest('Create Service', createServiceResult);

    if (createServiceResult.ok) {
      testServiceId = createServiceResult.data.id;
    }

    // Get service by ID and update
    if (testServiceId) {
      const getServiceByIdResult = await apiCall(API_ENDPOINTS.SERVICES.GET_BY_ID(testServiceId), 'GET', null, adminToken);
      logTest('Get Service by ID', getServiceByIdResult);

      // Update service
      const updateServiceResult = await apiCall(
        API_ENDPOINTS.SERVICES.UPDATE(testServiceId),
        'PUT',
        { ...newService, price: 6000 },
        adminToken
      );
      logTest('Update Service', updateServiceResult);
    }

    // 6. Test Appointments API
    console.log('📅 TESTING APPOINTMENTS API');
    console.log('-'.repeat(30));

    // Get all appointments
    const getAppointmentsResult = await apiCall(API_ENDPOINTS.APPOINTMENTS.GET_ALL(), 'GET', null, adminToken);
    logTest('Get All Appointments', getAppointmentsResult);

    // Create a test appointment
    const newAppointment = {
      customer_name: 'Test Customer API',
      service_id: testServiceId || null,
      trainer_id: testUserId || null,
      appointment_time: new Date().toISOString(),
      status: 'pending'
    };

    const createAppointmentResult = await apiCall(API_ENDPOINTS.APPOINTMENTS.CREATE, 'POST', newAppointment, adminToken);
    logTest('Create Appointment', createAppointmentResult);

    if (createAppointmentResult.ok) {
      testAppointmentId = createAppointmentResult.data.id;
    }

    // Update appointment
    if (testAppointmentId) {
      const updateAppointmentResult = await apiCall(
        API_ENDPOINTS.APPOINTMENTS.UPDATE(testAppointmentId),
        'PUT',
        { ...newAppointment, status: 'confirmed' },
        adminToken
      );
      logTest('Update Appointment', updateAppointmentResult);
    }

    // 7. Test Payments API
    console.log('💳 TESTING PAYMENTS API');
    console.log('-'.repeat(30));

    // Get all payments
    const getPaymentsResult = await apiCall(API_ENDPOINTS.PAYMENTS.GET_ALL(), 'GET', null, adminToken);
    logTest('Get All Payments', getPaymentsResult);

    // Create a test payment
    const newPayment = {
      customer_name: 'Test Customer API',
      amount: 5000,
      payment_method: 'cash',
      status: 'completed'
    };

    const createPaymentResult = await apiCall(API_ENDPOINTS.PAYMENTS.CREATE, 'POST', newPayment, adminToken);
    logTest('Create Payment', createPaymentResult);

    if (createPaymentResult.ok) {
      testPaymentId = createPaymentResult.data.id;
    }

    // Update payment
    if (testPaymentId) {
      const updatePaymentResult = await apiCall(
        API_ENDPOINTS.PAYMENTS.UPDATE(testPaymentId),
        'PUT',
        { ...newPayment, status: 'pending' },
        adminToken
      );
      logTest('Update Payment', updatePaymentResult);
    }

    // 8. Test Attendance API
    console.log('📊 TESTING ATTENDANCE API');
    console.log('-'.repeat(30));

    // Get all attendance
    const getAttendanceResult = await apiCall(API_ENDPOINTS.ATTENDANCE.GET_ALL(), 'GET', null, adminToken);
    logTest('Get All Attendance', getAttendanceResult);

    // Create attendance record
    const newAttendance = {
      customer_name: 'Test Customer Attendance',
      check_in: new Date().toISOString()
    };

    const createAttendanceResult = await apiCall(API_ENDPOINTS.ATTENDANCE.CREATE, 'POST', newAttendance, adminToken);
    logTest('Create Attendance', createAttendanceResult);

    // 9. Test Staff Attendance API
    console.log('👷 TESTING STAFF ATTENDANCE API');
    console.log('-'.repeat(30));

    if (testUserId) {
      // Staff check-in
      const staffCheckInResult = await apiCall(
        API_ENDPOINTS.STAFF_ATTENDANCE.CHECK_IN,
        'POST',
        { action: 'checkin', userId: testUserId, location: { lat: 28.6139, lng: 77.2090 } },
        adminToken
      );
      logTest('Staff Check-in', staffCheckInResult);

      // Get staff attendance history
      const staffHistoryResult = await apiCall(
        API_ENDPOINTS.STAFF_ATTENDANCE.GET_HISTORY(testUserId),
        'GET',
        null,
        adminToken
      );
      logTest('Staff Attendance History', staffHistoryResult);
    }

    // 10. Test Staff Salary API
    console.log('💰 TESTING STAFF SALARY API');
    console.log('-'.repeat(30));

    if (testUserId) {
      // Calculate salary
      const currentDate = new Date();
      const salaryCalcResult = await apiCall(
        API_ENDPOINTS.STAFF_SALARY.CALCULATE(testUserId, currentDate.getMonth() + 1, currentDate.getFullYear()),
        'GET',
        null,
        adminToken
      );
      logTest('Calculate Staff Salary', salaryCalcResult);

      // Get salary history
      const salaryHistoryResult = await apiCall(
        API_ENDPOINTS.STAFF_SALARY.GET_HISTORY(testUserId),
        'GET',
        null,
        adminToken
      );
      logTest('Staff Salary History', salaryHistoryResult);

      // Process salary
      const salaryProcessResult = await apiCall(
        API_ENDPOINTS.STAFF_SALARY.PROCESS,
        'POST',
        {
          userId: testUserId,
          month: currentDate.getMonth() + 1,
          year: currentDate.getFullYear(),
          bonuses: 1000,
          deductions: 200,
          status: 'pending'
        },
        adminToken
      );
      logTest('Process Staff Salary', salaryProcessResult);
    }

    // 11. Clean up test data
    console.log('🧹 CLEANING UP TEST DATA');
    console.log('-'.repeat(30));

    // Delete test payment
    if (testPaymentId) {
      const deletePaymentResult = await apiCall(API_ENDPOINTS.PAYMENTS.DELETE(testPaymentId), 'DELETE', null, adminToken);
      logTest('Delete Test Payment', deletePaymentResult);
    }

    // Delete test appointment
    if (testAppointmentId) {
      const deleteAppointmentResult = await apiCall(API_ENDPOINTS.APPOINTMENTS.DELETE(testAppointmentId), 'DELETE', null, adminToken);
      logTest('Delete Test Appointment', deleteAppointmentResult);
    }

    // Delete test service
    if (testServiceId) {
      const deleteServiceResult = await apiCall(API_ENDPOINTS.SERVICES.DELETE(testServiceId), 'DELETE', null, adminToken);
      logTest('Delete Test Service', deleteServiceResult);
    }

    // Delete test user
    if (testUserId) {
      const deleteUserResult = await apiCall(API_ENDPOINTS.USERS.DELETE(testUserId), 'DELETE', null, adminToken);
      logTest('Delete Test User', deleteUserResult);
    }

    // Delete test role
    if (testRoleId) {
      const deleteRoleResult = await apiCall(API_ENDPOINTS.ROLES.DELETE(testRoleId), 'DELETE', null, adminToken);
      logTest('Delete Test Role', deleteRoleResult);
    }

    console.log('🎉 Comprehensive API Testing Complete!');
    console.log('=' .repeat(60));
    console.log('Summary:');
    console.log('- Authentication: Tested');
    console.log('- Users CRUD: Tested');
    console.log('- Roles CRUD: Tested');
    console.log('- Permissions: Tested');
    console.log('- Services CRUD: Tested');
    console.log('- Appointments CRUD: Tested');
    console.log('- Payments CRUD: Tested');
    console.log('- Attendance: Tested');
    console.log('- Staff Attendance: Tested');
    console.log('- Staff Salary: Tested');
    console.log('- Cleanup: Completed');

  } catch (error) {
    console.error('❌ Test execution failed:', error);
  }
}

// Run the comprehensive tests
runComprehensiveAPITests();
