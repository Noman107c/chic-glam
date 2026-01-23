import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';


// Load environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase environment variables');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function setupDatabase() {
  try {
    console.log('🚀 Setting up Chic Glam database schema...');

    // Read the SQL file
    const sqlPath = path.join(process.cwd(), 'database-schema.sql');
    const sqlContent = fs.readFileSync(sqlPath, 'utf8');

    // Split SQL into individual statements
    const statements = sqlContent
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0 && !stmt.startsWith('--'));

    console.log(`Found ${statements.length} SQL statements to execute`);

    // Execute each statement
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];
      if (statement.trim()) {
        console.log(`Executing statement ${i + 1}/${statements.length}...`);

        try {
          const { error } = await supabase.rpc('exec_sql', { sql: statement });

          if (error) {
            // If exec_sql doesn't exist, try direct execution for simple statements
            console.log('Trying direct execution...');
            const { error: directError } = await supabase.from('_temp').select('*').limit(1); // Just to test connection

            if (directError && !directError.message.includes('relation "_temp" does not exist')) {
              throw directError;
            }

            // For DDL statements, we need to execute them differently
            console.log('Note: DDL statements need to be executed manually in Supabase dashboard');
            console.log('Statement:', statement.substring(0, 100) + '...');
          }
        } catch (err) {
          console.log(`⚠️  Statement ${i + 1} may need manual execution:`, err.message);
        }
      }
    }

    console.log('✅ Database setup script completed');
    console.log('📋 Next steps:');
    console.log('1. Go to your Supabase dashboard');
    console.log('2. Navigate to SQL Editor');
    console.log('3. Run the contents of database-schema.sql');
    console.log('4. Then run the API tests');

  } catch (error) {
    console.error('❌ Database setup failed:', error);
  }
}

setupDatabase();
