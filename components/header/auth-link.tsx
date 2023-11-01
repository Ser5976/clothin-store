'use client';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { buttonVariants } from '../ui/button';
import { SignOut } from './sign-out';

export const AuthLink = () => {
  const session = useSession();
  console.log('useSession:', session);
  return (
    <div className=" relative flex gap-2 ml-auto">
      {session.status === 'loading' && (
        <div className=" absolute top-0 left-0">Loding...</div>
      )}
      {session.status === 'authenticated' && (
        <div className=" flex items-center ">
          {session.data?.user.image && (
            <Image
              src={session.data.user.image}
              className="w-7 h-7 rounded-full"
              alt="картинка"
              width={50}
              height={50}
            />
          )}
          <SignOut />
        </div>
      )}
      {session.status === 'unauthenticated' && (
        <div className=" flex gap-1 items-baseline">
          <Link href="/signin" className={buttonVariants({ variant: 'ghost' })}>
            Sing In
          </Link>
          <div>/</div>
          <Link href="signup" className={buttonVariants({ variant: 'ghost' })}>
            Sing Up
          </Link>
        </div>
      )}
    </div>
  );
};
