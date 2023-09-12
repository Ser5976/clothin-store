'use client';

import { signOut } from 'next-auth/react';
import Link from 'next/link';

export const SignOut = () => {
  return (
    <Link
      href="#"
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
