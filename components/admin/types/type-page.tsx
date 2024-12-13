'use client';
import { Input } from '@/components/ui/input';
import { useTypeQuery } from '@/react-queries/admin/useTypeQuery';
import { Loader, RotateCw } from 'lucide-react';
import Image from 'next/image';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { ModalCreateType } from './modal-type/modal-create-type';
import { TypeItem } from './type-item';

export const TypePage = () => {
  // стейт для импута
  const [query, setQuery] = useState('');
  //обработка инпута
  const handlerInput = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  // кастомный хук useQuery,делаем запрос на получение всех типов
  const { data: typeData, isLoading, isError, refetch } = useTypeQuery(query);
  //т.к. при  вводе данных в поисковую строку результаты будут загружаться в реальном времени,делаем задержку
  // чтобы было меньше запросов
  useEffect(() => {
    const debounceFetch = setTimeout(() => {
      refetch();
    }, 300);

    return () => clearTimeout(debounceFetch);
  }, [query, refetch]);
  console.log('type:', typeData);
  return (
    <main className=" flex flex-col gap-5">
      <h1 className=" flex justify-between items-baseline   text-zinc-800 font-semibold  leading-[130%]  text-xl lg:text-3xl">
        <span>Types</span>
        <span className="text-lg lg:text-xl">
          {isLoading ? (
            <RotateCw size={20} className="   animate-spin" />
          ) : (
            typeData?.count
          )}
        </span>
      </h1>
      <div className=" flex justify-between">
        <div className=" relative w-[250px]">
          <Input
            type="text"
            placeholder="Search for products..."
            className="w-full pt-[11px] px-[16px] pb-[12px] rounded-[4px] border border-[#D7DADD]
        max-[450px]:w-[200px] focus:outline-none"
            value={query}
            onChange={handlerInput}
          />

          <Image
            src="/header/search.svg"
            alt="search"
            width={16}
            height={16}
            className="absolute top-[12px] right-[16px]"
          />
        </div>
        <ModalCreateType />
      </div>

      {isError ? (
        <h1 className=" text-center font-semibold text-red-600 mt-2">
          Something went wrong!
        </h1>
      ) : isLoading ? (
        <div className=" w-[32px] lg:w-[50px] mx-auto  animate-spin">
          <Loader size={32} color="#17696a" />
        </div>
      ) : typeData.types.length === 0 ? (
        <h1 className=" text-center font-semibold mt-2">
          The list of types is empty !
        </h1>
      ) : (
        <div>
          {typeData.types.map((type) => {
            return (
              <div key={type.id}>
                <TypeItem type={type} />
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
};
