import './globals.css';
import type { Metadata } from 'next';
import Providers from '@/provider/providers';
import { lato } from '@/fonts/fonts';
import Footer from '@/components/footer/footer';
import NavBar from '../components/header/navbar';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'CREATEX',
  description: 'Clothing store',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={lato.className}>
      <body className=" overflow-y-scroll min-w-[320px]   h-full ">
        <Providers>
          <div className=" flex flex-col">
            <Suspense>
              <NavBar />
            </Suspense>

            <div className=" grow  min-h-screen ">{children}</div>
            <Suspense>
              <Footer />
            </Suspense>
          </div>
        </Providers>
      </body>
    </html>
  );
}
