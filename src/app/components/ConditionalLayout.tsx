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
  const isPOSPage = pathname === '/';

  return (
    <>
      {!isDashboard && !isAuthLogin && !isPOSPage && <Header />}
      {children}
      {!isDashboard && !isAuthLogin && !isPOSPage && <Footer />}
    </>
  );
}
