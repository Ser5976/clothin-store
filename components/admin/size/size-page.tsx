'use client';
import { useSizeQuery } from '@/react-queries/admin/useSizeQuery';
import { Loader, RotateCw } from 'lucide-react';
import React from 'react';
import { ModalCreateSize } from './modal-size/modal-create-size';
import { SizeItem } from './size-item';

export const SizePage = () => {
  // кастомный хук useQuery,делаем запрос на получение всех размеров
  const { data: sizesList, isLoading, isError } = useSizeQuery();

  return (
    <main className=" flex flex-col gap-5">
      <h1 className=" flex justify-between items-baseline   text-zinc-800 font-semibold  leading-[130%]  text-xl lg:text-3xl">
        <span>Sizes</span>
        <span className="text-lg lg:text-xl">
          {isLoading ? (
            <RotateCw size={20} className="   animate-spin" />
          ) : (
            sizesList?.length
          )}
        </span>
      </h1>
      <div className=" flex justify-end">
        {' '}
        <ModalCreateSize />{' '}
      </div>

      {isError ? (
        <h1 className=" text-center font-semibold text-red-600 mt-2">
          Something went wrong!
        </h1>
      ) : isLoading ? (
        <div className=" w-[32px] lg:w-[50px] mx-auto  animate-spin">
          <Loader size={32} color="#17696a" />
        </div>
      ) : sizesList.length === 0 ? (
        <h1 className=" text-center font-semibold mt-2">
          The list of types is empty !
        </h1>
      ) : (
        sizesList.map((size) => {
          return (
            <div key={size.id}>
              <SizeItem size={size} />
            </div>
          );
        })
      )}
    </main>
  );
};
