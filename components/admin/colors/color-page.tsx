'use client';
import { useColorQuery } from '@/react-queries/admin/useColorQuery';
import { Loader, RotateCw } from 'lucide-react';
import React from 'react';
import { ColorItem } from './color-item';
import { ModalCreateColor } from './modal-color/modal-create-color';

export const ColorPage = () => {
  // кастомный хук useQuery,делаем запрос на получение всех цветов
  const { data: colorsList, isLoading, isError } = useColorQuery();
  return (
    <main className=" flex flex-col gap-5 ">
      <h1 className=" flex justify-between items-baseline   text-zinc-800 font-semibold  leading-[130%]  text-xl lg:text-3xl">
        <span>Colors</span>
        <span className="text-lg lg:text-xl">
          {isLoading ? (
            <RotateCw size={20} className="   animate-spin" />
          ) : (
            colorsList?.length
          )}
        </span>
      </h1>
      <div className=" flex justify-end">
        {' '}
        <ModalCreateColor />
      </div>

      {isError ? (
        <h1 className=" text-center font-semibold text-red-600 mt-2">
          Something went wrong!
        </h1>
      ) : isLoading ? (
        <div className=" w-[32px] lg:w-[50px] mx-auto  animate-spin">
          <Loader size={32} color="#17696a" />
        </div>
      ) : colorsList.length === 0 ? (
        <h1 className=" text-center font-semibold mt-2">
          The list of colors is empty !
        </h1>
      ) : (
        <div>
          {colorsList.map((color) => {
            return (
              <div key={color.id}>
                <ColorItem color={color} />
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
};
