'use client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ClipboardEdit, XCircle } from 'lucide-react';
import Link from 'next/link';
import { AlertDelete } from './alert-delete';
export type SizeType = {
  id: string;
  value: string;
};

export const GetSize = () => {
  const { data, isError } = useQuery({
    queryKey: ['size'],
    queryFn: async () => {
      const data = await axios.get('http://localhost:3000/api/size');
      return data;
    },
  });

  if (isError) {
    return <div className=" text-red-500">{'Something went wrong'}</div>;
  }

  // просто пример функции декоратор( пример использования функции колбэк,замыкание)
  const sum = (x: number) => {
    return x + 1;
  };
  const cachingDecorator = (callBack: (x: number) => number) => {
    let cach = new Map();
    return (x: number) => {
      if (cach.has(x)) {
        console.log('результат из кэша', cach.get(x));
        return cach.get(x);
      }
      let result = callBack(x);
      cach.set(x, result);
      return result;
    };
  };
  let func = cachingDecorator(sum);
  console.log('cachingDecorator:', func(1));
  console.log('cachingDecorator:', func(2));
  console.log('cachingDecorator:', func(1));
  console.log('cachingDecorator:', func(3));
  console.log('cachingDecorator:', func(2));

  return (
    <ul className=" flex gap-2 items-baseline">
      <div className=" text-amber-500 font-semibold ">Client:</div>
      {data?.data.map((value: any) => {
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
  );
};
