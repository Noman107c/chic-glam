import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3000/api';

// Test results tracker
const results = {
  passed: 0,
  failed: 0,
  tests: []
};

// Helper function for API calls
async function testAPI(endpoint, method = 'GET', body = null, description = '') {
  try {
    const config = {
      method,
      headers: { 'Content-Type': 'application/json' }
    };

    if (body) {
      config.body = JSON.stringify(body);
    }

    const response = await fetch(`${BASE_URL}${endpoint}`, config);
    const data = await response.json();

    const success = response.ok;
    if (success) {
      results.passed++;
      console.log(`✅ ${description}`);
    } else {
      results.failed++;
      console.log(`❌ ${description}`);
      console.log(`   Error: ${data.error || JSON.stringify(data).substring(0, 100)}`);
    }

    results.tests.push({
      endpoint,
      method,
      success,
      description,
      status: response.status
    });

    return { success, data, status: response.status };
  } catch (error) {
    results.failed++;
    console.log(`❌ ${description}`);
    console.log(`   Network Error: ${error.message}`);
    return { success: false, error: error.message };
  }
}

async function runAllTests() {
  console.log('🚀 CHIC GLAM API COMPREHENSIVE TEST SUITE');
  console.log('═'.repeat(70));
  console.log(`Base URL: ${BASE_URL}\n`);

  // 1. USERS API
  console.log('\n👥 TESTING USERS API');
  console.log('─'.repeat(70));
  
  await testAPI('/users', 'GET', null, 'GET /users - Fetch all users');
  
  const testUser = {
    full_name: 'Test User ' + Date.now(),
    email: `test${Date.now()}@example.com`,
    role_id: null,
    is_active: true
  };
  const userResult = await testAPI('/users', 'POST', testUser, 'POST /users - Create user');
  const userId = userResult.data?.id;

  if (userId) {
    await testAPI(`/users?id=${userId}`, 'GET', null, `GET /users?id=${userId} - Get user by ID`);
    
    const updatedUser = { full_name: 'Updated User' };
    await testAPI(`/users?id=${userId}`, 'PUT', updatedUser, `PUT /users?id=${userId} - Update user`);
  }

  // 2. ROLES API
  console.log('\n🎭 TESTING ROLES API');
  console.log('─'.repeat(70));
  
  await testAPI('/roles', 'GET', null, 'GET /roles - Fetch all roles');
  
  const testRole = {
    name: 'Test Role ' + Date.now(),
    description: 'Test role for API testing'
  };
  const roleResult = await testAPI('/roles', 'POST', testRole, 'POST /roles - Create role');
  const roleId = roleResult.data?.id;

  if (roleId) {
    await testAPI(`/roles?id=${roleId}`, 'GET', null, `GET /roles?id=${roleId} - Get role by ID`);
  }

  // 3. PERMISSIONS API
  console.log('\n🔐 TESTING PERMISSIONS API');
  console.log('─'.repeat(70));
  
  await testAPI('/permissions', 'GET', null, 'GET /permissions - Fetch all permissions');
  
  const testPermission = {
    name: 'test.permission.' + Date.now()
  };
  await testAPI('/permissions', 'POST', testPermission, 'POST /permissions - Create permission');

  // 4. SERVICES API
  console.log('\n💼 TESTING SERVICES API');
  console.log('─'.repeat(70));
  
  await testAPI('/services', 'GET', null, 'GET /services - Fetch all services');
  
  const testService = {
    name: 'Test Service ' + Date.now(),
    price: 99.99,
    duration_minutes: 60
  };
  const serviceResult = await testAPI('/services', 'POST', testService, 'POST /services - Create service');
  const serviceId = serviceResult.data?.id;

  // 5. APPOINTMENTS API
  console.log('\n📅 TESTING APPOINTMENTS API');
  console.log('─'.repeat(70));
  
  await testAPI('/appointments', 'GET', null, 'GET /appointments - Fetch all appointments');
  
  const testAppointment = {
    customer_name: 'Test Customer ' + Date.now(),
    service_id: serviceId,
    trainer_id: userId,
    appointment_time: new Date(Date.now() + 86400000).toISOString(),
    status: 'pending'
  };
  const appointmentResult = await testAPI('/appointments', 'POST', testAppointment, 'POST /appointments - Create appointment');
  const appointmentId = appointmentResult.data?.id;

  // 6. PAYMENTS API
  console.log('\n💳 TESTING PAYMENTS API');
  console.log('─'.repeat(70));
  
  await testAPI('/payments', 'GET', null, 'GET /payments - Fetch all payments');
  
  const testPayment = {
    customer_name: 'Test Customer ' + Date.now(),
    amount: 100,
    payment_method: 'credit_card',
    status: 'paid'
  };
  const paymentResult = await testAPI('/payments', 'POST', testPayment, 'POST /payments - Create payment');
  const paymentId = paymentResult.data?.id;

  if (paymentId) {
    const updatedPayment = { status: 'pending' };
    await testAPI(`/payments?id=${paymentId}`, 'PUT', updatedPayment, `PUT /payments?id=${paymentId} - Update payment`);
  }

  // 7. ATTENDANCE API
  console.log('\n📍 TESTING ATTENDANCE API');
  console.log('─'.repeat(70));
  
  await testAPI('/attendance', 'GET', null, 'GET /attendance - Fetch attendance records');
  
  const testAttendance = {
    customer_name: 'Test Customer ' + Date.now(),
    check_in: new Date().toISOString(),
    check_out: null
  };
  await testAPI('/attendance', 'POST', testAttendance, 'POST /attendance - Create attendance record');

  // 8. STAFF ATTENDANCE API
  console.log('\n👔 TESTING STAFF ATTENDANCE API');
  console.log('─'.repeat(70));
  
  await testAPI('/staff/attendance', 'GET', null, 'GET /staff/attendance - Fetch staff attendance');

  // 9. FINANCE API
  console.log('\n💰 TESTING FINANCE API');
  console.log('─'.repeat(70));
  
  await testAPI('/staff/salary', 'GET', null, 'GET /staff/salary - Fetch salary records');

  // 10. AUTH API
  console.log('\n🔑 TESTING AUTH API');
  console.log('─'.repeat(70));
  
  const loginData = {
    email: 'test@example.com',
    password: 'password123'
  };
  await testAPI('/auth/login', 'POST', loginData, 'POST /auth/login - Login');

  // SUMMARY
  console.log('\n' + '═'.repeat(70));
  console.log('📊 TEST SUMMARY');
  console.log('═'.repeat(70));
  console.log(`✅ Passed: ${results.passed}`);
  console.log(`❌ Failed: ${results.failed}`);
  console.log(`📈 Total: ${results.passed + results.failed}`);
  console.log(`Success Rate: ${((results.passed / (results.passed + results.failed)) * 100).toFixed(2)}%`);

  console.log('\n📋 DETAILED RESULTS:\n');
  results.tests.forEach((test, idx) => {
    const status = test.success ? '✅' : '❌';
    console.log(`${idx + 1}. ${status} [${test.method}] ${test.endpoint}`);
    console.log(`   Description: ${test.description}`);
    console.log(`   Status Code: ${test.status}\n`);
  });
}

runAllTests();
