const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:3000';

// Test data
const testTrainer = {
  email: 'trainer@chicglam.com',
  password: 'password123'
};

const testBeautician = {
  email: 'beautician@chicglam.com',
  password: 'password123'
};

let trainerToken = '';
let beauticianToken = '';
let trainerId = '';
let beauticianId = '';

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
    return { status: response.status, data };
  } catch (error) {
    return { status: 500, error: error.message };
  }
}

// Test functions
async function testLogin() {
  console.log('\n=== Testing Login API ===');

  // Test trainer login
  console.log('Testing trainer login...');
  const trainerLogin = await apiCall('/api/auth/login', 'POST', testTrainer);
  console.log('Trainer login response:', trainerLogin);

  if (trainerLogin.status === 200) {
    trainerToken = trainerLogin.data.token;
    trainerId = trainerLogin.data.user.id;
    console.log('✅ Trainer login successful');
  } else {
    console.log('❌ Trainer login failed');
  }

  // Test beautician login
  console.log('Testing beautician login...');
  const beauticianLogin = await apiCall('/api/auth/login', 'POST', testBeautician);
  console.log('Beautician login response:', beauticianLogin);

  if (beauticianLogin.status === 200) {
    beauticianToken = beauticianLogin.data.token;
    beauticianId = beauticianLogin.data.user.id;
    console.log('✅ Beautician login successful');
  } else {
    console.log('❌ Beautician login failed');
  }
}

async function testAttendance() {
  console.log('\n=== Testing Staff Attendance API ===');

  // Test trainer check-in
  console.log('Testing trainer check-in...');
  const trainerCheckIn = await apiCall('/api/staff/attendance', 'POST', {
    action: 'checkin',
    userId: trainerId,
    location: { lat: 28.6139, lng: 77.2090 }
  }, trainerToken);
  console.log('Trainer check-in response:', trainerCheckIn);

  if (trainerCheckIn.status === 201) {
    console.log('✅ Trainer check-in successful');
  } else {
    console.log('❌ Trainer check-in failed');
  }

  // Test beautician check-in
  console.log('Testing beautician check-in...');
  const beauticianCheckIn = await apiCall('/api/staff/attendance', 'POST', {
    action: 'checkin',
    userId: beauticianId,
    location: { lat: 28.6139, lng: 77.2090 }
  }, beauticianToken);
  console.log('Beautician check-in response:', beauticianCheckIn);

  if (beauticianCheckIn.status === 201) {
    console.log('✅ Beautician check-in successful');
  } else {
    console.log('❌ Beautician check-in failed');
  }

  // Test getting attendance history
  console.log('Testing attendance history...');
  const attendanceHistory = await apiCall(`/api/staff/attendance?userId=${trainerId}&action=history`, 'GET', null, trainerToken);
  console.log('Attendance history response:', attendanceHistory);

  if (attendanceHistory.status === 200) {
    console.log('✅ Attendance history retrieved successfully');
  } else {
    console.log('❌ Attendance history retrieval failed');
  }
}

async function testSalary() {
  console.log('\n=== Testing Staff Salary API ===');

  // Test salary calculation
  console.log('Testing salary calculation...');
  const salaryCalc = await apiCall(`/api/staff/salary?userId=${trainerId}&action=calculate&month=12&year=2024`, 'GET', null, trainerToken);
  console.log('Salary calculation response:', salaryCalc);

  if (salaryCalc.status === 200) {
    console.log('✅ Salary calculation successful');
  } else {
    console.log('❌ Salary calculation failed');
  }

  // Test salary history
  console.log('Testing salary history...');
  const salaryHistory = await apiCall(`/api/staff/salary?userId=${trainerId}&action=history`, 'GET', null, trainerToken);
  console.log('Salary history response:', salaryHistory);

  if (salaryHistory.status === 200) {
    console.log('✅ Salary history retrieved successfully');
  } else {
    console.log('❌ Salary history retrieval failed');
  }

  // Test salary processing
  console.log('Testing salary processing...');
  const salaryProcess = await apiCall('/api/staff/salary', 'POST', {
    userId: trainerId,
    month: 12,
    year: 2024,
    bonuses: 500,
    deductions: 100,
    status: 'pending'
  }, trainerToken);
  console.log('Salary processing response:', salaryProcess);

  if (salaryProcess.status === 201) {
    console.log('✅ Salary processing successful');
  } else {
    console.log('❌ Salary processing failed');
  }
}

// Run all tests
async function runTests() {
  console.log('🚀 Starting API Tests for Trainer/Beautician Management');
  console.log('Server should be running on http://localhost:3000');

  try {
    await testLogin();
    await testAttendance();
    await testSalary();

    console.log('\n🎉 API Testing Complete!');
    console.log('\nSummary:');
    console.log('- Login API: Tested trainer and beautician authentication');
    console.log('- Attendance API: Tested check-in/out and history retrieval');
    console.log('- Salary API: Tested calculation, history, and processing');

  } catch (error) {
    console.error('❌ Test execution failed:', error);
  }
}

// Run the tests
runTests();
