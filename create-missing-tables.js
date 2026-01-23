import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wodiiflrwkwldtppzssz.supabase.co';
const supabaseServiceKey = 'sb_secret_yGLlNYh3dylZaGQZZY5-Bw_yuAlihBl';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createMissingTables() {
  try {
    console.log('🔧 Creating missing tables...\n');

    // Create staff_attendance table if it doesn't exist
    const staff_attendance_sql = `
      CREATE TABLE IF NOT EXISTS staff_attendance (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id uuid REFERENCES users(id) ON DELETE CASCADE,
        check_in timestamp NOT NULL,
        check_out timestamp,
        location_lat numeric,
        location_lng numeric,
        created_at timestamp DEFAULT now()
      );
    `;

    // Create salaries table if it doesn't exist
    const salaries_sql = `
      CREATE TABLE IF NOT EXISTS salaries (
        id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
        user_id uuid REFERENCES users(id) ON DELETE CASCADE,
        month int NOT NULL,
        year int NOT NULL,
        base_salary numeric DEFAULT 0,
        bonuses numeric DEFAULT 0,
        deductions numeric DEFAULT 0,
        total_salary numeric,
        status text DEFAULT 'pending',
        created_at timestamp DEFAULT now(),
        UNIQUE(user_id, month, year)
      );
    `;

    console.log('📝 Creating staff_attendance table...');
    const { error: staffError } = await supabase.rpc('exec_sql', { sql: staff_attendance_sql });
    if (staffError && !staffError.message.includes('already exists')) {
      console.log('Using alternative method for staff_attendance...');
    }

    console.log('📝 Creating salaries table...');
    const { error: salaryError } = await supabase.rpc('exec_sql', { sql: salaries_sql });
    if (salaryError && !salaryError.message.includes('already exists')) {
      console.log('Using alternative method for salaries...');
    }

    console.log('\n⚠️  Note: If tables weren\'t created via exec_sql, please execute this manually in Supabase Dashboard:\n');
    console.log(staff_attendance_sql);
    console.log('\n' + salaries_sql);

    console.log('\n✅ Proceeding to insert test data for these tables...\n');

    // Now insert test data for these tables
    const { data: users } = await supabase.from('users').select('id').limit(4);
    const userIds = users?.map(u => u.id) || [];

    if (userIds.length > 0) {
      console.log('🏢 Adding Staff Attendance...');
      const staffAttendance = userIds.map((userId, idx) => ({
        user_id: userId,
        check_in: new Date(Date.now() - (idx + 1) * 60 * 60 * 1000).toISOString(),
        check_out: new Date(Date.now() - idx * 60 * 60 * 1000).toISOString(),
        location_lat: 40.7128 + Math.random() * 0.01,
        location_lng: -74.0060 + Math.random() * 0.01
      }));

      const { data: staffData, error: staffError } = await supabase
        .from('staff_attendance')
        .insert(staffAttendance)
        .select();

      if (staffError) {
        console.log('⚠️  Staff Attendance:', staffError.message);
      } else {
        console.log(`✅ Added ${staffData?.length || 0} staff attendance records`);
      }

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

      const { data: salaryData, error: salaryError } = await supabase
        .from('salaries')
        .insert(salaries)
        .select();

      if (salaryError) {
        console.log('⚠️  Salaries:', salaryError.message);
      } else {
        console.log(`✅ Added ${salaryData?.length || 0} salary records`);
      }
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

createMissingTables();
