'use client';
import { useBillboardQuery } from '@/react-queries/admin/useBillboardQuery';
import { Loader, RotateCw } from 'lucide-react';
import React from 'react';
import { BillboardItem } from './billboard-item';
import { ModalCreateBillboard } from './modal-billboard/modal-create-billboard';

export const BillboardPage = () => {
  // кастомный хук useQuery,делаем запрос на получение всех биллбордов
  const { data: billboardsList, isLoading, isError } = useBillboardQuery();

  return (
    <main className=" flex flex-col gap-5">
      <h1 className=" flex justify-between items-baseline   text-zinc-800 font-semibold  leading-[130%]  text-xl lg:text-3xl">
        <span>Billboards</span>
        <span className="text-lg lg:text-xl">
          {isLoading ? (
            <RotateCw size={20} className="   animate-spin" />
          ) : (
            billboardsList?.length
          )}
        </span>
      </h1>
      <div className=" flex justify-end">
        <ModalCreateBillboard />
      </div>

      {isError ? (
        <h1 className=" text-center font-semibold text-red-600 mt-2">
          Something went wrong!
        </h1>
      ) : isLoading ? (
        <div className=" w-[32px] lg:w-[50px] mx-auto  animate-spin">
          <Loader size={32} color="#17696a" />
        </div>
      ) : billboardsList.length === 0 ? (
        <h1 className=" text-center font-semibold mt-2">
          The list of types is empty !
        </h1>
      ) : (
        <div>
          {billboardsList.map((billboard) => {
            return (
              <div key={billboard.id}>
                <BillboardItem billboard={billboard} />
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
};
