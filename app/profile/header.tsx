import { buttonVariants } from '@/components/ui/button';
import prismadb from '@/lib/prismadb';
import { ClipboardEdit } from 'lucide-react';
import Link from 'next/link';
import { AlertDelete } from './alert-delete';
import { GetSize } from './get-size';
import { SelectForm } from './select-form';

export default async function Header() {
  const dataSize = await prismadb.size.findMany();

  return (
    <div className=" flex gap-10">
      <div className=" flex flex-col">
        <div className=" flex flex-col gap-4 items-center p-2">
          <div className=" text-2xl font-semibold ">Sizes</div>
          <Link href="/profile/create" className={buttonVariants()}>
            Add
          </Link>
        </div>
        <div className=" flex flex-col items-center gap-4 p-4">
          <ul className=" flex gap-2 items-baseline ">
            <div className=" text-yellow-500 font-semibold ">Server:</div>
            {dataSize.map((value) => {
              return (
                <div
                  key={value.id}
                  className=" relative flex w-[100px] h-[80px] border border-slate-950 justify-center items-center "
                >
                  <Link href={`/profile/${value.id}`}>
                    <ClipboardEdit
                      size={16}
                      color="#17696A"
                      strokeWidth={1}
                      className=" absolute top-[5px] right-[18px] "
                    />
                  </Link>
                  <AlertDelete sizeId={value.id} />
                  <div>{value.value}</div>
                </div>
              );
            })}
          </ul>
          <GetSize />
        </div>
      </div>
      <div className=" p-4">
        <SelectForm data={dataSize} />
      </div>
    </div>
  );
}
