import { Skeleton } from '@/components/ui/skeleton';

export const SkeletonEvaluationAnalytics = () => {
  return (
    <div className=" flex flex-col grow  max-w-[420px] gap-[20px] pt-2 ">
      {new Array(5).fill(1).map((_, i) => {
        return (
          <div key={i} className=" flex gap-[10px] items-center">
            <Skeleton className="w-[30px] h-[10px] " />

            <Skeleton className="h-[10px] w-full rounded-sm" />

            <Skeleton className="w-[15px] h-[10px] " />
          </div>
        );
      })}
    </div>
  );
};
