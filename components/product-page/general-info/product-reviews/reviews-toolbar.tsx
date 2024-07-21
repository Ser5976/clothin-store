import { Button } from '@/components/ui/button';
import {
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Select } from '@radix-ui/react-select';
import { useSession } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import React, { useState } from 'react';
import { Dispatch, FC, memo, SetStateAction } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { LeaveReviewForm } from './leave-review/leave-review-form';
import Link from 'next/link';

type SortType = {
  oldest: boolean;
  rating: boolean;
  reset: boolean;
  page: number;
};

type ReviewsToolbarProps = {
  setSort: Dispatch<SetStateAction<SortType>>;
  productId: string;
};
const ReviewsToolbar: FC<ReviewsToolbarProps> = ({ setSort, productId }) => {
  // console.log('Render:ReviewsToolbar');

  return (
    <div className=" flex justify-between mb-[60px] max-md:mb-[40px]">
      <LeaveReviewModal productId={productId} />
      <SortReviews setSort={setSort} />
    </div>
  );
};
export default memo(ReviewsToolbar);

const LeaveReviewModal = ({ productId }: { productId: string }) => {
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
          <LeaveReviewForm setIsOpen={setIsOpen} productId={productId} />
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

const SortReviews = ({
  setSort,
}: {
  setSort: Dispatch<SetStateAction<SortType>>;
}) => {
  // при помощи switch case изменяем объект для сортировки
  const getSorting = (value: string) => {
    switch (value) {
      case 'rating':
        setSort((prev) => {
          return { ...prev, rating: true, oldest: false, reset: false };
        });
        break;
      case 'reset':
        setSort((prev) => {
          return { ...prev, reset: true, oldest: false, rating: false };
        });
        break;
      case 'oldest':
        setSort((prev) => {
          return { ...prev, rating: false, oldest: true, reset: false };
        });
        break;
      default:
        setSort((prev) => prev);
        break;
    }
  };
  return (
    <Select onValueChange={getSorting}>
      <SelectGroup>
        <SelectTrigger className=" w-[130px] h-11 max-md:w-[110px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>

        <SelectContent>
          <SelectItem value="rating"> high rating</SelectItem>
          <SelectItem value="oldest">oldest</SelectItem>
          <SelectItem value="reset"> reset</SelectItem>
        </SelectContent>
      </SelectGroup>
    </Select>
  );
};
