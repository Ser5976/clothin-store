import { Skeleton } from '@/components/ui/skeleton';
import { FC, HTMLAttributes } from 'react';

type RatingSkeletonProps = {
  className?: HTMLAttributes<HTMLDivElement> | string;
};

const RatingSkeleton: FC<RatingSkeletonProps> = ({ className }) => {
  return (
    <div className={`flex-col ${className}`}>
      <div className=" flex gap-[2%]">
        {new Array(5).fill(1).map((_, i) => {
          return (
            <Skeleton
              key={i}
              className="w-[15px] h-[15px] sm:w-[17px] sm:h-[17px]"
            />
          );
        })}
      </div>
      <div className=" grid grid-cols-5 gap-[3%] mt-[5%]">
        <Skeleton className=" h-[12px]   sm:h-[16px] col-span-4" />
        <Skeleton className=" h-[12px]   sm:h-[16px] col-span-1" />
      </div>
    </div>
  );
};

export default RatingSkeleton;
