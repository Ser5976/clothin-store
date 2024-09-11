import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import Link from 'next/link';
import { LeaveStoreReviewForm } from './leave-store-review-form';

export const LeaveStoreReviewModal = () => {
  //проверка авторизации(отзыв может написать только авторизованный пользователь)
  const { data } = useSession();
  // для редиректа на логин и обратно при авторизации
  const path = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          size="sm"
          className=" text-[14px] h-11 bg-cyan-800 w-[180px] hover:bg-cyan-900 max-md:w-[150px] "
        >
          Leave a review
        </Button>
      </DialogTrigger>

      {data ? (
        <DialogContent className="max-w-[350px] mx-2 rounded-sm">
          <DialogHeader>
            <DialogTitle className="text-center text-zinc-800 text-[28px] font-bold mb-4">
              Leave a review
            </DialogTitle>
          </DialogHeader>
          <LeaveStoreReviewForm setIsOpen={setIsOpen} />
        </DialogContent>
      ) : (
        <DialogContent className="max-w-[350px] mx-2 rounded-sm   ">
          <DialogHeader>
            <DialogTitle className="text-center text-zinc-800 text-[28px] font-bold mb-4">
              Log in to leave a review
            </DialogTitle>
          </DialogHeader>
          <Link href={`/signin?callbackUrl=${path}`}>
            <Button className=" w-full bg-cyan-800 hover:bg-cyan-900 mt-[12px] ">
              Sign in
            </Button>
          </Link>

          <div className="">
            <span className=" text-gray-700 text-xs font-normal">
              Don't have an account?{' '}
            </span>
            <Link
              href={`/signup?callbackUrl=${path}`}
              className=" text-cyan-800 text-xs font-normal hover:text-cyan-900 underline underline-offset-2"
            >
              Sign up
            </Link>
          </div>
        </DialogContent>
      )}
    </Dialog>
  );
};
