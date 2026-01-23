'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('noman@gmail.com');
  const [password, setPassword] = useState('123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Simple credential validation
      if (email === 'noman@gmail.com' && password === '123') {
        // Store auth token in localStorage
        localStorage.setItem('authToken', 'demo-token-' + Date.now());
        localStorage.setItem('userEmail', email);
        router.push('/dashboard');
      } else {
        setError('Invalid credentials. Use noman@gmail.com / 123');
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-4">
      <div className="login-card">
        <Image src="/chic.png" alt="Chic Glam Logo" width={64} height={64} className="login-logo" />
        <p className="text-center mb-8" style={{ color: 'var(--foreground)' }}>Admin Dashboard</p>

        <form onSubmit={handleLogin} className="space-y-6">
          {error && (
            <div style={{ backgroundColor: 'rgba(255, 0, 0, 0.1)', color: 'var(--foreground)', border: '1px solid red', padding: '1rem', borderRadius: '0.375rem' }}>
              {error}
            </div>
          )}

          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="noman@gmail.com"
            required
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="123"
            required
          />

          <Button
            type="submit"
            className="w-full"
            style={{ backgroundColor: 'var(--primary-color)', color: 'white', border: 'none' }}
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </form>

        <div className="mt-6 p-4 rounded-lg border" style={{ backgroundColor: 'rgba(57, 45, 34, 0.1)', borderColor: 'var(--primary-color)', color: 'var(--foreground)' }}>
          <p className="text-sm text-black">
            <strong>Demo Credentials:</strong><br />
            Email: noman@gmail.com<br />
            Password: 123
          </p>
        </div>
      </div>
    </div>
  );
}
