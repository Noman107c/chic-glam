const { createClient } = require('@supabase/supabase-js');

// Replace with your Supabase URL and anon key
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'your-supabase-url';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function createTestUser() {
  try {
    // Create user with Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: 'noman@gmail.com',
      password: '123',
    });

    if (authError) {
      console.log('Auth error:', authError.message);
      // If user already exists, try to sign in
      const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
        email: 'noman@gmail.com',
        password: '123',
      });

      if (signInError) {
        console.error('Sign in error:', signInError.message);
        return;
      }

      console.log('User already exists, signed in successfully');
      return;
    }

    console.log('User created successfully:', authData.user?.email);

    // Insert user profile into users table
    const { data: profileData, error: profileError } = await supabase
      .from('users')
      .insert([
        {
          id: authData.user?.id,
          full_name: 'Noman Admin',
          email: 'noman@gmail.com',
          role_id: 'admin-role-id', // Replace with actual admin role ID
          is_active: true,
        },
      ]);

    if (profileError) {
      console.error('Profile creation error:', profileError.message);
    } else {
      console.log('User profile created successfully');
    }

  } catch (error) {
    console.error('Error:', error.message);
  }
}

createTestUser();
