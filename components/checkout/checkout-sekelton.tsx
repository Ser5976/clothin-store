import { Skeleton } from '@/components/ui/skeleton';

export const CheckoutSkeleton = () => {
  return (
    <div className="flex flex-col bg-neutral-100 rounded px-1 mb-10">
      <div className="flex py-4 border-b border-slate-200  gap-[3%] ">
        <Skeleton className=" w-[80px] h-[90px] " />

        <div className=" flex gap-1 w-[65%]">
          <div className=" flex flex-col gap-2 w-[45%]">
            <Skeleton className=" max-w-[150px] h-[15%]" />
            <Skeleton className=" max-w-[50px] h-[10%]" />
            <Skeleton className=" max-w-[45px] h-[10%]" />
          </div>

          <div className=" w-[25%] ">
            <Skeleton className=" max-w-[70px] h-[35%]" />
          </div>
          <div className=" w-[30%] ">
            <Skeleton className=" max-w-[60px] h-[15%]" />
          </div>
        </div>
        <div className="  w-[20%]">
          <Skeleton className=" max-w-[75px] h-[40%]" />
        </div>
      </div>

      <div className="flex py-4 border-b border-slate-200  gap-[3%] ">
        <Skeleton className=" w-[80px] h-[90px] " />

        <div className=" flex gap-1 w-[65%]">
          <div className=" flex flex-col gap-2 w-[45%]">
            <Skeleton className=" max-w-[150px] h-[15%]" />
            <Skeleton className=" max-w-[50px] h-[10%]" />
            <Skeleton className=" max-w-[45px] h-[10%]" />
          </div>

          <div className=" w-[25%] ">
            <Skeleton className=" max-w-[70px] h-[35%]" />
          </div>
          <div className=" w-[30%] ">
            <Skeleton className=" max-w-[60px] h-[15%]" />
          </div>
        </div>
        <div className="  w-[20%]">
          <Skeleton className=" max-w-[75px] h-[40%]" />
        </div>
      </div>

      <div className="p-[5%] flex gap-[1.5%] justify-end">
        <Skeleton className=" w-16 h-5" />
        <Skeleton className=" w-12 h-5" />
      </div>
    </div>
  );
};
