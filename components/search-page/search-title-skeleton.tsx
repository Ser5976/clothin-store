import { Skeleton } from '@/components/ui/skeleton';

export const SerchTitleSkeleton = () => {
  return (
    <div className=" flex gap-4 py-2 items-baseline mb-[2%]  ">
      <Skeleton className="w-[130px] h-[14px] sm:h-[16px] md:h-[18px] lg:h-[20px] xl:h-[24px]" />
      <Skeleton className="w-[50px] h-[14px] sm:h-[16px] md:h-[18px] lg:h-[20px] xl:h-[24px]" />
      <Skeleton className="w-[120px] h-[14px] sm:h-[16px] md:h-[18px] lg:h-[20px] xl:h-[24px]" />
      <Skeleton className="w-[110px] h-[12px] sm:h-[14px] md:h-[16px] lg:h-[18px] xl:h-[20px]" />
    </div>
  );
};
