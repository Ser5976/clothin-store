import './globals.css';
import type { Metadata } from 'next';
import Providers from '@/provider/providers';
import { lato } from '@/fonts/fonts';
import Footer from '@/components/footer';
import NavBar from '../components/header/navbar';

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
      <body className=" overflow-y-scroll min-w-[280px] h-full ">
        <Providers>
          <div className=" flex flex-col min-h-screen  overflow-hidden">
            <NavBar />
            <div className=" flex-grow flex-1  min-h-screen ">{children}</div>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
