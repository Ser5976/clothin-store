import './globals.css';
import type { Metadata } from 'next';
import Providers from '@/provider/providers';
import { lato } from '@/fonts/fonts';
import Footer from '@/components/footer/footer';
import NavBar from '../components/header/navbar';
import { Suspense } from 'react';
import { Loader } from 'lucide-react';

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
            <Suspense fallback={<CategoriesBarFallback />}>
              <NavBar />
              <div className=" grow  min-h-screen ">{children}</div>
              <Footer />
            </Suspense>
          </div>
        </Providers>
      </body>
    </html>
  );
}
function CategoriesBarFallback() {
  return (
    <div className=" w-[32px] lg:w-[50px] mx-auto my-[300px] animate-spin">
      <Loader size={32} color="#17696a" />
    </div>
  );
}
