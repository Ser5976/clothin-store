import { Skeleton } from '@/components/ui/skeleton';

export const OrderSkeleton = () => {
  return (
    <div className="flex flex-col bg-neutral-100 rounded px-1 mb-10">
      <div className="flex py-4 border-b border-slate-200  gap-[3%] ">
        <Skeleton className=" w-[90px] h-[150px] " />

        <div className=" flex gap-1 w-[75%]">
          <div className=" flex flex-col gap-2 w-[45%]">
            <Skeleton className=" max-w-[150px] h-[15%]" />
            <Skeleton className=" max-w-[50px] h-[10%]" />
            <Skeleton className=" max-w-[45px] h-[10%]" />
          </div>

          <div className=" w-[25%] ">
            <Skeleton className=" max-w-[70px] h-[35%]" />
          </div>
          <div className=" flex w-[30%] justify-end">
            <Skeleton className=" w-full max-w-[60px] h-[20%]" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-[10px] items-end  py-[2%] px-[3%] ">
        <Skeleton className=" w-24 h-4" />
        <Skeleton className=" w-24 h-4" />
        <Skeleton className=" w-24 h-4" />
        <Skeleton className=" w-32 h-5" />
      </div>
    </div>
  );
};
