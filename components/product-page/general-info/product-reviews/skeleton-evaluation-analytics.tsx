import { Skeleton } from '@/components/ui/skeleton';

export const SkeletonEvaluationAnalytics = () => {
  return (
    <div className=" flex flex-col grow  max-w-[420px] gap-[20px] mb-[100px] max-md:mb-[65px]">
      {new Array(5).fill(1).map((_, i) => {
        return (
          <div key={i} className=" flex gap-[15px] items-center">
            <div className=" flex gap-[5px] items-baseline">
              <Skeleton className="w-[12px] h-[12px] " />
              <Skeleton className="w-[12px] h-[12px] " />
            </div>

            <Skeleton className="h-1 w-full rounded-sm" />

            <Skeleton className="w-[12px] h-[12px] " />
          </div>
        );
      })}
    </div>
  );
};
