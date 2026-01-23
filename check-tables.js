import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const supabaseUrl = 'https://wodiiflrwkwldtppzssz.supabase.co';
const supabaseServiceKey = 'sb_secret_yGLlNYh3dylZaGQZZY5-Bw_yuAlihBl';

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function checkAndSetupDatabase() {
  try {
    console.log('🔍 Checking existing tables in Supabase...\n');

    // List of tables we need
    const requiredTables = [
      'roles',
      'users',
      'permissions',
      'role_permissions',
      'services',
      'appointments',
      'payments',
      'expenses',
      'attendance',
      'staff_attendance',
      'salaries'
    ];

    // Check each table
    for (const table of requiredTables) {
      try {
        const { data, error } = await supabase.from(table).select('*').limit(1);
        if (error && error.message.includes('does not exist')) {
          console.log(`❌ ${table} - NOT EXISTS`);
        } else if (error) {
          console.log(`⚠️  ${table} - ERROR: ${error.message}`);
        } else {
          console.log(`✅ ${table} - EXISTS`);
        }
      } catch (err) {
        console.log(`❌ ${table} - ERROR: ${err.message}`);
      }
    }

    console.log('\n📝 Reading SQL schema...');
    const sqlPath = path.join(process.cwd(), 'database-schema.sql');
    const sqlContent = fs.readFileSync(sqlPath, 'utf8');

    // Execute SQL via query
    console.log('\n🚀 Executing database schema...');
    const { data, error } = await supabase.rpc('exec_sql', { sql: sqlContent });

    if (error) {
      console.log('⚠️  exec_sql not available (normal). Tables need manual setup via Supabase dashboard.');
      console.log('\nTo create tables manually:');
      console.log('1. Go to https://app.supabase.com/project/wodiiflrwkwldtppzssz');
      console.log('2. Click SQL Editor');
      console.log('3. Paste contents of database-schema.sql');
      console.log('4. Click Run\n');
    } else {
      console.log('✅ Schema executed successfully');
    }

    // Re-check tables after execution
    console.log('\n📊 Final table status:');
    for (const table of requiredTables) {
      try {
        const { data, error } = await supabase.from(table).select('*').limit(1);
        if (error && error.message.includes('does not exist')) {
          console.log(`❌ ${table} - NOT EXISTS`);
        } else {
          console.log(`✅ ${table} - EXISTS`);
        }
      } catch (err) {
        console.log(`❌ ${table} - ERROR`);
      }
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

checkAndSetupDatabase();
