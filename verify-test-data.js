import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wodiiflrwkwldtppzssz.supabase.co';
const supabaseServiceKey = 'sb_secret_yGLlNYh3dylZaGQZZY5-Bw_yuAlihBl';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function verifyTestData() {
  try {
    console.log('✅ VERIFYING TEST DATA IN DATABASE\n');
    console.log('═'.repeat(60) + '\n');

    const tables = [
      'roles',
      'users',
      'permissions',
      'role_permissions',
      'services',
      'appointments',
      'payments',
      'expenses',
      'attendance'
    ];

    let totalRecords = 0;

    for (const table of tables) {
      const { data, error, count } = await supabase
        .from(table)
        .select('*', { count: 'exact' });

      if (error) {
        console.log(`❌ ${table.padEnd(20)} - Error: ${error.message}`);
      } else {
        totalRecords += count || 0;
        console.log(`✅ ${table.padEnd(20)} - ${count} records`);
      }
    }

    console.log('\n' + '═'.repeat(60));
    console.log(`\n📊 TOTAL RECORDS IN DATABASE: ${totalRecords}\n`);

    // Show sample data
    console.log('📋 SAMPLE DATA:\n');

    console.log('👥 Users:');
    const { data: users } = await supabase.from('users').select('id, full_name, email, is_active').limit(3);
    users?.forEach(u => {
      console.log(`   • ${u.full_name} (${u.email}) - ${u.is_active ? 'Active' : 'Inactive'}`);
    });

    console.log('\n💼 Services:');
    const { data: services } = await supabase.from('services').select('name, price, duration_minutes').limit(3);
    services?.forEach(s => {
      console.log(`   • ${s.name} - $${s.price} (${s.duration_minutes} min)`);
    });

    console.log('\n📅 Appointments:');
    const { data: appointments } = await supabase.from('appointments').select('customer_name, status').limit(3);
    appointments?.forEach(a => {
      console.log(`   • ${a.customer_name} - ${a.status}`);
    });

    console.log('\n💳 Payments:');
    const { data: payments } = await supabase.from('payments').select('customer_name, amount, status').limit(3);
    payments?.forEach(p => {
      console.log(`   • ${p.customer_name} - $${p.amount} (${p.status})`);
    });

    console.log('\n📍 Attendance:');
    const { data: attendance } = await supabase.from('attendance').select('customer_name, check_in, check_out').limit(3);
    attendance?.forEach(a => {
      const checkin = a.check_in ? new Date(a.check_in).toLocaleTimeString() : 'N/A';
      const checkout = a.check_out ? new Date(a.check_out).toLocaleTimeString() : 'N/A';
      console.log(`   • ${a.customer_name} - IN: ${checkin}, OUT: ${checkout}`);
    });

    console.log('\n\n✨ DATABASE READY TO USE! All APIs can now fetch this data.\n');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

verifyTestData();
