import { Skeleton } from '@/components/ui/skeleton';
import { FC, HTMLAttributes } from 'react';

type RatingSkeletonProps = {
  className?: HTMLAttributes<HTMLDivElement> | string;
};

const RatingSkeleton: FC<RatingSkeletonProps> = ({ className }) => {
  return (
    <div className={`flex-col ${className}`}>
      <Skeleton className=" h-[12px] w-[100px] sm:h-[16px] sm:[100px] " />
      <div className=" grid grid-cols-5 gap-[3%] mt-[5%]">
        <Skeleton className=" h-[12px]   sm:h-[16px] col-span-4" />
        <Skeleton className=" h-[12px]   sm:h-[16px] col-span-1" />
      </div>
    </div>
  );
};

export default RatingSkeleton;
