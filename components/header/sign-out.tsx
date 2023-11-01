'use client';

import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { buttonVariants } from '../ui/button';

export const SignOut = () => {
  return (
    <Link
      href="#"
      className={buttonVariants({ variant: 'ghost' })}
      onClick={() =>
        signOut({
          callbackUrl: '/',
        })
      }
    >
      Sing Out
    </Link>
  );
};
