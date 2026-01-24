#!/usr/bin/env node

console.log('🔧 Supabase Connection Diagnostic\n');
console.log('=' .repeat(50));

const supabaseUrl = 'https://wodiiflrwkwldtppzssz.supabase.co';
const projectId = 'wodiiflrwkwldtppzssz';

console.log('\n📋 Your Supabase Configuration:');
console.log(`  Project ID: ${projectId}`);
console.log(`  Project URL: ${supabaseUrl}`);
console.log(`  Database Host: db.${projectId}.supabase.co`);
console.log(`  Database Port: 5432`);
console.log(`  Database User: postgres.${projectId}`);
console.log(`  Database Name: postgres`);

console.log('\n🔑 To fix the connection, follow these steps:');
console.log('');
console.log('1️⃣  Go to Supabase Dashboard:');
console.log('   https://app.supabase.com/projects');
console.log('');
console.log('2️⃣  Click on your project (wodiiflrwkwldtppzssz)');
console.log('');
console.log('3️⃣  Go to Settings → Database');
console.log('');
console.log('4️⃣  Look for "Connection string" section');
console.log('');
console.log('5️⃣  Copy the PostgreSQL connection string');
console.log('   It should look like:');
console.log('   postgresql://postgres.[PROJECT_ID]:[PASSWORD]@db.[PROJECT_ID].supabase.co:5432/postgres');
console.log('');
console.log('6️⃣  Update .env.local with:');
console.log('   DATABASE_URL=<the connection string you copied>');
console.log('');
console.log('7️⃣  Run this script again to test connection');
console.log('');
console.log('=' .repeat(50));
console.log('\n📝 Alternative: If connection string has special characters,');
console.log('   ensure it\'s properly URL-encoded in DATABASE_URL');
console.log('\n💡 Tip: You can also use the "Password" shown in Settings');
console.log('   and construct the URL yourself:');
console.log('   postgresql://postgres.' + projectId + ':[YOUR_PASSWORD]@db.' + projectId + '.supabase.co:5432/postgres');
