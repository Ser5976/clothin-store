'use client';
import { SessionProvider } from 'next-auth/react';
import Toast from './toast/Toast';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <Toast />
      {children}
    </SessionProvider>
  );
};

export default Providers;
