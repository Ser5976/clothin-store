import { authOptions } from '@/app/api/auth/config/auth_options';
import { getServerSession } from 'next-auth';
import Link from 'next/link';
import { BottomBar } from './bottombar/bottombar';
import { MedianBar } from './medianbar/medianbar';

import { TopBar } from './topbar/topbar';

const NavBar = () => {
  return (
    <header className=" shadow h-32">
      <TopBar />
      <MedianBar />
      <BottomBar />
    </header>
  );
};

export default NavBar;
