import { Skeleton } from '@/components/ui/skeleton';

export const SkeletonStoreReviews = () => {
  return (
    <div className="flex flex-col">
      {new Array(2).fill(1).map((_, i) => {
        return (
          <div
            key={i}
            className="grid grid-cols-3 gap-3 py-4  border-b border-slate-200 last:border-none "
          >
            <div className="col-span-1 flex flex-col gap-4;">
              <Skeleton className=" max-w-[120px] h-5 mb-2 " />
              <Skeleton className=" max-w-[100px] h-4 mb-2 " />
            </div>
            <div className="col-span-2 flex flex-col gap-3">
              <div className=" fle flex-col gap-2 ">
                <Skeleton className=" w-full h-4 mb-2 " />
                <Skeleton className=" w-full h-4 mb-2 " />
                <div className=" grid grid-cols-10">
                  <div className="col-span-1"></div>
                  <Skeleton className=" col-span-9 h-4 mb-2  " />
                </div>
                <div className=" grid grid-cols-10">
                  <div className="col-span-1"></div>
                  <Skeleton className=" col-span-9 h-4 mb-2  " />
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
