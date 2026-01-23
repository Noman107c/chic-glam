import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wodiiflrwkwldtppzssz.supabase.co';
const supabaseServiceKey = 'sb_secret_yGLlNYh3dylZaGQZZY5-Bw_yuAlihBl';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function addTestData() {
  try {
    console.log('🚀 Starting test data insertion...\n');

    // 1. Add Services
    console.log('📋 Adding Services...');
    const services = [
      { name: 'Personal Training Session', price: 75, duration_minutes: 60 },
      { name: 'Yoga Class', price: 25, duration_minutes: 75 },
      { name: 'Haircut & Style', price: 50, duration_minutes: 45 },
      { name: 'Manicure', price: 35, duration_minutes: 30 },
      { name: 'Facial Treatment', price: 80, duration_minutes: 60 },
      { name: 'Massage Therapy', price: 100, duration_minutes: 90 }
    ];

    const { data: servicesData, error: servicesError } = await supabase
      .from('services')
      .insert(services)
      .select();

    if (servicesError) {
      console.log('⚠️  Services error:', servicesError.message);
    } else {
      console.log(`✅ Added ${servicesData?.length || 0} services`);
    }

    const serviceIds = servicesData?.map(s => s.id) || [];

    // 2. Add Users (Trainers & Beauticians)
    console.log('\n👥 Adding Users...');
    
    // Get trainer and beautician role IDs
    const { data: rolesData } = await supabase.from('roles').select('id, name');
    const trainerRole = rolesData?.find(r => r.name === 'trainer');
    const beauticiancianRole = rolesData?.find(r => r.name === 'beautician');

    const users = [
      {
        full_name: 'John Trainer',
        email: `john.trainer.${Date.now()}@chicglam.com`,
        role_id: trainerRole?.id,
        is_active: true
      },
      {
        full_name: 'Sarah Beautician',
        email: `sarah.beautician.${Date.now()}@chicglam.com`,
        role_id: beauticiancianRole?.id,
        is_active: true
      },
      {
        full_name: 'Mike Trainer',
        email: `mike.trainer.${Date.now()}@chicglam.com`,
        role_id: trainerRole?.id,
        is_active: true
      },
      {
        full_name: 'Emma Beautician',
        email: `emma.beautician.${Date.now()}@chicglam.com`,
        role_id: beauticiancianRole?.id,
        is_active: true
      }
    ];

    const { data: usersData, error: usersError } = await supabase
      .from('users')
      .insert(users)
      .select();

    if (usersError) {
      console.log('⚠️  Users error:', usersError.message);
    } else {
      console.log(`✅ Added ${usersData?.length || 0} users`);
    }

    const userIds = usersData?.map(u => u.id) || [];

    // 3. Add Appointments
    console.log('\n📅 Adding Appointments...');
    const appointments = [
      {
        customer_name: 'Alice Johnson',
        service_id: serviceIds[0],
        trainer_id: userIds[0],
        appointment_time: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'confirmed'
      },
      {
        customer_name: 'Bob Williams',
        service_id: serviceIds[1],
        trainer_id: userIds[0],
        appointment_time: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'pending'
      },
      {
        customer_name: 'Charlie Brown',
        service_id: serviceIds[2],
        trainer_id: userIds[1],
        appointment_time: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'completed'
      },
      {
        customer_name: 'Diana Miller',
        service_id: serviceIds[3],
        trainer_id: userIds[2],
        appointment_time: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000).toISOString(),
        status: 'cancelled'
      }
    ];

    const { data: appointmentsData, error: appointmentsError } = await supabase
      .from('appointments')
      .insert(appointments)
      .select();

    if (appointmentsError) {
      console.log('⚠️  Appointments error:', appointmentsError.message);
    } else {
      console.log(`✅ Added ${appointmentsData?.length || 0} appointments`);
    }

    // 4. Add Payments
    console.log('\n💳 Adding Payments...');
    const payments = [
      {
        customer_name: 'Alice Johnson',
        amount: 75,
        payment_method: 'credit_card',
        status: 'paid'
      },
      {
        customer_name: 'Bob Williams',
        amount: 25,
        payment_method: 'debit_card',
        status: 'paid'
      },
      {
        customer_name: 'Charlie Brown',
        amount: 50,
        payment_method: 'cash',
        status: 'paid'
      },
      {
        customer_name: 'Diana Miller',
        amount: 35,
        payment_method: 'credit_card',
        status: 'pending'
      }
    ];

    const { data: paymentsData, error: paymentsError } = await supabase
      .from('payments')
      .insert(payments)
      .select();

    if (paymentsError) {
      console.log('⚠️  Payments error:', paymentsError.message);
    } else {
      console.log(`✅ Added ${paymentsData?.length || 0} payments`);
    }

    // 5. Add Attendance
    console.log('\n📍 Adding Attendance Records...');
    const attendance = [
      {
        customer_name: 'Alice Johnson',
        check_in: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        check_out: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString()
      },
      {
        customer_name: 'Bob Williams',
        check_in: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
        check_out: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString()
      },
      {
        customer_name: 'Charlie Brown',
        check_in: new Date().toISOString(),
        check_out: null
      }
    ];

    const { data: attendanceData, error: attendanceError } = await supabase
      .from('attendance')
      .insert(attendance)
      .select();

    if (attendanceError) {
      console.log('⚠️  Attendance error:', attendanceError.message);
    } else {
      console.log(`✅ Added ${attendanceData?.length || 0} attendance records`);
    }

    // 6. Add Staff Attendance
    console.log('\n🏢 Adding Staff Attendance...');
    const staffAttendance = userIds.map((userId, idx) => ({
      user_id: userId,
      check_in: new Date(Date.now() - (idx + 1) * 60 * 60 * 1000).toISOString(),
      check_out: new Date(Date.now() - idx * 60 * 60 * 1000).toISOString(),
      location_lat: 40.7128 + Math.random() * 0.01,
      location_lng: -74.0060 + Math.random() * 0.01
    }));

    const { data: staffAttendanceData, error: staffAttendanceError } = await supabase
      .from('staff_attendance')
      .insert(staffAttendance)
      .select();

    if (staffAttendanceError) {
      console.log('⚠️  Staff Attendance error:', staffAttendanceError.message);
    } else {
      console.log(`✅ Added ${staffAttendanceData?.length || 0} staff attendance records`);
    }

    // 7. Add Expenses
    console.log('\n💰 Adding Expenses...');
    const expenses = [
      { title: 'Equipment Purchase', amount: 500 },
      { title: 'Cleaning Supplies', amount: 150 },
      { title: 'Staff Training', amount: 300 },
      { title: 'Utilities', amount: 200 }
    ];

    const { data: expensesData, error: expensesError } = await supabase
      .from('expenses')
      .insert(expenses)
      .select();

    if (expensesError) {
      console.log('⚠️  Expenses error:', expensesError.message);
    } else {
      console.log(`✅ Added ${expensesData?.length || 0} expenses`);
    }

    // 8. Add Salaries
    console.log('\n💵 Adding Salaries...');
    const salaries = userIds.map((userId, idx) => ({
      user_id: userId,
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear(),
      base_salary: 3000 + idx * 500,
      bonuses: 200,
      deductions: 100,
      total_salary: 3100 + idx * 500,
      status: 'paid'
    }));

    const { data: salariesData, error: salariesError } = await supabase
      .from('salaries')
      .insert(salaries)
      .select();

    if (salariesError) {
      console.log('⚠️  Salaries error:', salariesError.message);
    } else {
      console.log(`✅ Added ${salariesData?.length || 0} salary records`);
    }

    console.log('\n✨ Test data insertion completed!');
    console.log('\n📊 Summary:');
    console.log(`  • Services: ${servicesData?.length || 0}`);
    console.log(`  • Users: ${usersData?.length || 0}`);
    console.log(`  • Appointments: ${appointmentsData?.length || 0}`);
    console.log(`  • Payments: ${paymentsData?.length || 0}`);
    console.log(`  • Attendance: ${attendanceData?.length || 0}`);
    console.log(`  • Staff Attendance: ${staffAttendanceData?.length || 0}`);
    console.log(`  • Expenses: ${expensesData?.length || 0}`);
    console.log(`  • Salaries: ${salariesData?.length || 0}`);

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

addTestData();
