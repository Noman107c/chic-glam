import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3001';

// Test data
const testUsers = [
  {
    name: 'John Trainer',
    email: 'trainer@chicglam.com',
    role: 'trainer',
    password: 'password123'
  },
  {
    name: 'Sarah Beautician',
    email: 'beautician@chicglam.com',
    role: 'beautician',
    password: 'password123'
  },
  {
    name: 'Mike Trainer',
    email: 'trainer2@chicglam.com',
    role: 'trainer',
    password: 'password123'
  },
  {
    name: 'Emma Beautician',
    email: 'beautician2@chicglam.com',
    role: 'beautician',
    password: 'password123'
  }
];

const testRoles = [
  {
    name: 'trainer',
    description: 'Fitness trainer with access to gym facilities and client management',
    permissions: ['user.read', 'booking.create', 'booking.read', 'booking.update', 'attendance.create', 'attendance.read']
  },
  {
    name: 'beautician',
    description: 'Beauty specialist with access to salon services and client appointments',
    permissions: ['user.read', 'booking.create', 'booking.read', 'booking.update', 'services.read', 'attendance.create', 'attendance.read']
  }
];

const testServices = [
  { name: 'Personal Training Session', price: 75, duration_minutes: 60 },
  { name: 'Yoga Class', price: 25, duration_minutes: 75 },
  { name: 'Haircut & Style', price: 50, duration_minutes: 45 },
  { name: 'Manicure', price: 35, duration_minutes: 30 }
];

const testAppointments = [
  { customer_name: 'Alice Johnson', status: 'confirmed' },
  { customer_name: 'Bob Williams', status: 'pending' },
  { customer_name: 'Charlie Brown', status: 'completed' },
  { customer_name: 'Diana Miller', status: 'cancelled' }
];

const testPayments = [
  { customer_name: 'Alice Johnson', amount: 75, payment_method: 'credit_card', status: 'completed' },
  { customer_name: 'Charlie Brown', amount: 50, payment_method: 'cash', status: 'completed' }
];

const testPermissions = [
  { name: 'users.create' },
  { name: 'users.read' },
  { name: 'users.update' },
  { name: 'users.delete' },
  { name: 'roles.create' },
  { name: 'roles.read' },
  { name: 'roles.update' },
  { name: 'roles.delete' },
  { name: 'permissions.read' },
  { name: 'attendance.create' },
  { name: 'attendance.read' },
  { name: 'services.read' },
  { name: 'services.create' },
  { name: 'booking.create' },
  { name: 'booking.read' },
  { name: 'booking.update' },
  { name: 'payments.create' },
  { name: 'payments.read' }
];


let adminToken = '';
let userIds = [];
let serviceIds = [];

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
    console.error(`API call to ${endpoint} failed:`, error.message);
    return { status: 500, error: error.message };
  }
}

async function createPermissions() {
  console.log('\n=== Creating Permissions ===');

  for (const permission of testPermissions) {
    console.log(`Creating permission: ${permission.name}`);
    const response = await apiCall('/api/permissions', 'POST', permission, adminToken);

    if (response.status === 201) {
      console.log(`✅ Permission "${permission.name}" created successfully`);
    } else {
      console.log(`❌ Failed to create permission "${permission.name}":`, response.data?.error || response.error);
    }
    await new Promise(resolve => setTimeout(resolve, 500));
  }
}

async function createServices() {
  console.log('\n=== Creating Services ===');

  for (const service of testServices) {
    console.log(`Creating service: ${service.name}`);
    const response = await apiCall('/api/services', 'POST', service, adminToken);

    if (response.status === 201) {
      console.log(`✅ Service "${service.name}" created successfully`);
      serviceIds.push(response.data.data.id);
    } else {
      console.log(`❌ Failed to create service "${service.name}":`, response.data?.error || response.error);
    }
    await new Promise(resolve => setTimeout(resolve, 500));
  }
}

async function createAppointments() {
  console.log('\n=== Creating Appointments ===');
  if (userIds.length === 0 || serviceIds.length === 0) {
    console.log('❌ Cannot create appointments without users and services.');
    return;
  }

  for (let i = 0; i < testAppointments.length; i++) {
    const appointmentData = {
      ...testAppointments[i],
      service_id: serviceIds[i % serviceIds.length],
      trainer_id: userIds[i % userIds.length],
      appointment_time: new Date(new Date().getTime() + i * 24 * 60 * 60 * 1000).toISOString() // schedule for upcoming days
    };

    console.log(`Creating appointment for: ${appointmentData.customer_name}`);
    const response = await apiCall('/api/appointments', 'POST', appointmentData, adminToken);

    if (response.status === 201) {
      console.log(`✅ Appointment for "${appointmentData.customer_name}" created successfully`);
    } else {
      console.log(`❌ Failed to create appointment for "${appointmentData.customer_name}":`, response.data?.error || response.error);
    }
    await new Promise(resolve => setTimeout(resolve, 500));
  }
}

async function createPayments() {
  console.log('\n=== Creating Payments ===');

  for (const payment of testPayments) {
    console.log(`Creating payment for: ${payment.customer_name}`);
    const response = await apiCall('/api/payments', 'POST', payment, adminToken);

    if (response.status === 201) {
      console.log(`✅ Payment for "${payment.customer_name}" created successfully`);
    } else {
      console.log(`❌ Failed to create payment for "${payment.customer_name}":`, response.data?.error || response.error);
    }
    await new Promise(resolve => setTimeout(resolve, 500));
  }
}

async function createRoles() {
  console.log('\n=== Creating Roles ===');

  for (const role of testRoles) {
    console.log(`Creating role: ${role.name}`);
    const response = await apiCall('/api/roles', 'POST', role, adminToken);

    if (response.status === 201) {
      console.log(`✅ Role "${role.name}" created successfully`);
    } else {
      console.log(`❌ Failed to create role "${role.name}":`, response.data?.error || response.error);
    }

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }
}

async function createUsers() {
  console.log('\n=== Creating Users ===');

  for (const user of testUsers) {
    console.log(`Creating user: ${user.name} (${user.email})`);
    const response = await apiCall('/api/users', 'POST', user, adminToken);

    if (response.status === 201) {
      console.log(`✅ User "${user.name}" created successfully`);
      userIds.push(response.data.id);
    } else {
      console.log(`❌ Failed to create user "${user.name}":`, response.data?.error || response.error);
    }

    // Small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }
}

async function createAttendanceData() {
  console.log('\n=== Creating Attendance Data ===');

  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  for (const userId of userIds) {
    // Create attendance for today
    console.log(`Creating today's attendance for user ${userId}`);
    const checkInResponse = await apiCall('/api/staff/attendance', 'POST', {
      action: 'checkin',
      userId: userId,
      location: { lat: 28.6139, lng: 77.2090 }
    }, adminToken);

    if (checkInResponse.status === 201) {
      const attendanceId = checkInResponse.data.id;

      // Check out after some time
      setTimeout(async () => {
        const checkOutResponse = await apiCall('/api/staff/attendance', 'POST', {
          action: 'checkout',
          id: attendanceId
        }, adminToken);

        if (checkOutResponse.status === 200) {
          console.log(`✅ Attendance completed for user ${userId}`);
        } else {
          console.log(`❌ Failed to check out user ${userId}`);
        }
      }, 1000); // 1 second delay for checkout
    } else {
      console.log(`❌ Failed to check in user ${userId}`);
    }

    // Small delay between users
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
}

async function createSalaryData() {
  console.log('\n=== Creating Salary Data ===');

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();

  for (const userId of userIds) {
    console.log(`Creating salary data for user ${userId}`);

    // First calculate salary
    const calcResponse = await apiCall(`/api/staff/salary?userId=${userId}&action=calculate&month=${currentMonth}&year=${currentYear}`, 'GET', null, adminToken);

    if (calcResponse.status === 200) {
      // Then create salary record
      const salaryData = {
        userId: userId,
        month: currentMonth,
        year: currentYear,
        bonuses: Math.floor(Math.random() * 1000),
        deductions: Math.floor(Math.random() * 200),
        status: 'pending'
      };

      const salaryResponse = await apiCall('/api/staff/salary', 'POST', salaryData, adminToken);

      if (salaryResponse.status === 201) {
        console.log(`✅ Salary record created for user ${userId}`);
      } else {
        console.log(`❌ Failed to create salary for user ${userId}:`, salaryResponse.data?.error || salaryResponse.error);
      }
    } else {
      console.log(`❌ Failed to calculate salary for user ${userId}`);
    }

    // Small delay between users
    await new Promise(resolve => setTimeout(resolve, 500));
  }
}

async function loginAsAdmin() {
  console.log('\n=== Logging in as Admin ===');

  // Login directly with existing admin credentials
  console.log('Logging in as admin...');
  const loginResponse = await apiCall('/api/auth/login', 'POST', {
    email: 'noman@gmail.com',
    password: '123'
  });

  if (loginResponse.status === 200) {
    adminToken = loginResponse.data.token;
    console.log('✅ Admin login successful');
    return true;
  } else {
    console.log('❌ Admin login failed:', loginResponse.data?.error || loginResponse.error);
    return false;
  }
}

async function runDataCreation() {
  console.log('🚀 Starting Test Data Creation for Trainer/Beautician Management');
  console.log('Server should be running on http://localhost:3000');

  try {
    // Create permissions first (no auth required)
    await createPermissions();

    // Create roles (no auth required)
    await createRoles();

    // Try to login as admin for the rest
    const adminLoginSuccess = await loginAsAdmin();

    if (adminLoginSuccess) {
      // Create users
      await createUsers();

      // Create services
      await createServices();

      // Create appointments
      await createAppointments();

      // Create payments
      await createPayments();

      // Wait a bit before creating attendance
      console.log('\n⏳ Waiting 2 seconds before creating attendance data...');
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Create attendance data
      await createAttendanceData();

      // Wait for attendance to complete
      console.log('\n⏳ Waiting 3 seconds for attendance processing...');
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Create salary data
      await createSalaryData();

      console.log('\n🎉 Test Data Creation Complete!');
      console.log('\nCreated:');
      console.log(`- ${testPermissions.length} permissions`);
      console.log(`- ${testRoles.length} roles`);
      console.log(`- ${testUsers.length} users`);
      console.log(`- ${testServices.length} services`);
      console.log(`- ${testAppointments.length} appointments`);
      console.log(`- ${testPayments.length} payments`);
      console.log('- Attendance records for all users');
      console.log('- Salary records for current month');

      console.log('\n📋 Test Accounts:');
      testUsers.forEach(user => {
        console.log(`- ${user.name}: ${user.email} / ${user.password}`);
      });
      console.log('- Admin: noman@gmail.com / 123');
    } else {
      console.log('\n⚠️  Admin login failed, but roles and permissions were created successfully!');
      console.log('\nCreated:');
      console.log(`- ${testPermissions.length} permissions`);
      console.log(`- ${testRoles.length} roles`);
      console.log('\nNote: Users, services, appointments, payments, attendance, and salary data require admin access');
    }

  } catch (error) {
    console.error('❌ Data creation failed:', error);
  }
}

// Run the data creation
runDataCreation();