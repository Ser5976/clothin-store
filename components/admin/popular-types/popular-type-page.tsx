'use client';
import { usePopularTypeQuery } from '@/react-queries/admin/usePopularTypeQuery';
import { Loader, RotateCw } from 'lucide-react';
import React from 'react';
import { ModalCreatePopularType } from './modal-popular-type/modal-create-popular-type';
import { PopularTypeItem } from './popular-type-item';

export const PopularTypePage = () => {
  // кастомный хук useQuery,делаем запрос на получение всех popular types
  const { data: popularTupeList, isLoading, isError } = usePopularTypeQuery();

  return (
    <main className=" flex flex-col gap-5">
      <h1 className=" flex justify-between items-baseline   text-zinc-800 font-semibold  leading-[130%]  text-xl lg:text-3xl">
        <span>Popular types</span>
        <span className="text-lg lg:text-xl">
          {isLoading ? (
            <RotateCw size={20} className="   animate-spin" />
          ) : (
            popularTupeList?.length
          )}
        </span>
      </h1>
      <div className=" flex justify-end">
        {' '}
        <ModalCreatePopularType />{' '}
      </div>

      {isError ? (
        <h1 className=" text-center font-semibold text-red-600 mt-2">
          Something went wrong!
        </h1>
      ) : isLoading ? (
        <div className=" w-[32px] lg:w-[50px] mx-auto  animate-spin">
          <Loader size={32} color="#17696a" />
        </div>
      ) : popularTupeList.length === 0 ? (
        <h1 className=" text-center font-semibold mt-2">
          The list of types is empty !
        </h1>
      ) : (
        <div>
          {popularTupeList.map((popularType) => {
            return (
              <div key={popularType.id}>
                <PopularTypeItem popularType={popularType} />
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
};
