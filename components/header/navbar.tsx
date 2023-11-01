import { authOptions } from '@/app/api/auth/config/auth_options';
import { getServerSession } from 'next-auth';

import Link from 'next/link';
import { AuthLink } from './auth-link';

const Navbar = async () => {
  // const session = await getServerSession(authOptions);
  return (
    <div className=" bg-slate-300 ">
      <div className=" max-w-7xl m-auto">
        <div className="pl-5 flex gap-4 h-[128px] items-center ">
          <div className=" flex gap-4  px-5">
            <Link href="/profile">Profile</Link>
            <Link href="/admin">Admin</Link>
          </div>
          <AuthLink />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
