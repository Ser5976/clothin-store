'use client';
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import { ourFileRouter } from '@/app/api/uploadthing/core';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SessionProvider } from 'next-auth/react';
import { extractRouterConfig } from 'uploadthing/server';
import Toast from './toast/Toast';
import { useState } from 'react';

const Providers = ({ children }: { children: React.ReactNode }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false, // default: true,чтобы не было повторных запросов при изменении фокуса
          },
        },
      })
  );
  return (
    <QueryClientProvider client={queryClient}>
      <SessionProvider>
        <Toast />
        <NextSSRPlugin
          /**
           * The `extractRouterConfig` will extract **only** the route configs
           * from the router to prevent additional information from being
           * leaked to the client. The data passed to the client is the same
           * as if you were to fetch `/api/uploadthing` directly.
           */
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
        {children}
      </SessionProvider>
    </QueryClientProvider>
  );
};

export default Providers;
