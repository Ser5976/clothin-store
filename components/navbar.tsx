import { authOptions } from '@/app/api/auth/config/auth_options';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import Link from 'next/link';
import { SignOut } from './sign-out';

const Navbar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <div className=" bg-slate-300 ">
      <div className=" max-w-7xl m-auto">
        <div className="pl-5 flex gap-4 h-[128px] items-center ">
          {session ? (
            <>
              {session.user.image && (
                <Image
                  src={session.user.image}
                  className="w-7 h-7 rounded-full"
                  alt="картинка"
                  width={50}
                  height={50}
                />
              )}
              <SignOut />
            </>
          ) : (
            <div className=" flex gap-2">
              <Link href="/signin">Sing In</Link>
              <span>/</span>
              <Link href="signup">Sing Up</Link>
            </div>
          )}
          <div className=" flex gap-4 ml-auto px-5">
            <Link href="/profile">Profile</Link>
            <Link href="/admin">Admin</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
