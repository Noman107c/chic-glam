'use client';

import { usePathname } from 'next/navigation';
import Header from './Header';
import Footer from './Footer';

interface ConditionalLayoutProps {
  children: React.ReactNode;
}

export default function ConditionalLayout({ children }: ConditionalLayoutProps) {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');
  const isAuthLogin = pathname === '/auth/login';

  return (
    <>
      {!isDashboard && !isAuthLogin && <Header />}
      {children}
      {!isDashboard && !isAuthLogin && <Footer />}
    </>
  );
}
