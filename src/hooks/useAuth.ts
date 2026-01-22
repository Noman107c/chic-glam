import { useState, useEffect } from 'react';
import { supabaseClient, getUserRole } from '@/lib/supabaseClient';
import { User } from '@/services/user.service';

export interface AuthUser extends User {
  auth_id: string;
}

export const useAuth = () => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    // Get initial session
    const getInitialSession = async () => {
      const { data: { session } } = await supabaseClient.auth.getSession();

      if (session?.user) {
        await loadUserData(session.user.id);
      } else {
        setLoading(false);
      }
    };

    getInitialSession();

    // Listen for auth changes
    const { data: { subscription } } = supabaseClient.auth.onAuthStateChange(
      async (event: string, session: any) => {
        if (session?.user) {
          await loadUserData(session.user.id);
        } else {
          setUser(null);
          setRole(null);
          setLoading(false);
        }
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const loadUserData = async (authId: string) => {
    try {
      // Get user data from database
      const { data: userData, error } = await supabaseClient
        .from('users')
        .select('*')
        .eq('id', authId)
        .single();

      if (error) {
        console.error('Error loading user data:', error);
        setLoading(false);
        return;
      }

      if (userData) {
        setUser({
          ...userData,
          auth_id: authId,
        });
        setRole(userData.role);
      }
    } catch (error) {
      console.error('Error in loadUserData:', error);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;
    return data;
  };

  const signUp = async (email: string, password: string, userData: Omit<User, 'id' | 'created_at'>) => {
    const { data, error } = await supabaseClient.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    if (data.user) {
      // Create user record in database
      const { error: dbError } = await supabaseClient
        .from('users')
        .insert([{
          id: data.user.id,
          ...userData,
        }]);

      if (dbError) throw dbError;
    }

    return data;
  };

  const signOut = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) throw error;
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) throw new Error('No user logged in');

    const { data, error } = await supabaseClient
      .from('users')
      .update(updates)
      .eq('id', user.id)
      .select()
      .single();

    if (error) throw error;

    setUser({
      ...user,
      ...data,
    });

    return data;
  };

  return {
    user,
    role,
    loading,
    signIn,
    signUp,
    signOut,
    updateProfile,
    isSuperAdmin: role === 'super_admin',
    isBeautician: role === 'beautician',
    isTrainer: role === 'trainer',
  };
};
