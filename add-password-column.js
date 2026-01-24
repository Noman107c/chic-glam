const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function addPasswordColumn() {
    try {
        console.log('Adding password_hash and role columns to users table...');

        // Execute the SQL to add columns
        const { data, error } = await supabase.rpc('exec_sql', {
            sql_query: `
        ALTER TABLE users ADD COLUMN IF NOT EXISTS password_hash text;
        ALTER TABLE users ADD COLUMN IF NOT EXISTS role text;
      `
        });

        if (error) {
            console.error('Error executing SQL:', error);

            // Try alternative method - add columns directly
            console.log('Trying alternative method...');

            // First, check current schema
            const { data: users, error: selectError } = await supabase
                .from('users')
                .select('*')
                .limit(1);

            if (selectError) {
                console.error('Error checking users table:', selectError);
            } else {
                console.log('Current users table columns:', Object.keys(users[0] || {}));
                console.log('\nPlease run this SQL in Supabase SQL Editor:');
                console.log('ALTER TABLE users ADD COLUMN IF NOT EXISTS password_hash text;');
                console.log('ALTER TABLE users ADD COLUMN IF NOT EXISTS role text;');
            }
        } else {
            console.log('✅ Columns added successfully!');
        }
    } catch (err) {
        console.error('Unexpected error:', err);
        console.log('\n📝 Please manually run this SQL in Supabase SQL Editor:');
        console.log('ALTER TABLE users ADD COLUMN IF NOT EXISTS password_hash text;');
        console.log('ALTER TABLE users ADD COLUMN IF NOT EXISTS role text;');
    }
}

addPasswordColumn();
