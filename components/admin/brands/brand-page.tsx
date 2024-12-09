'use client';
import { Input } from '@/components/ui/input';
import { useBrandQuery } from '@/react-queries/admin/useBrandQuery';
import { Loader, RotateCw } from 'lucide-react';
import Image from 'next/image';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { BrandItem } from './brand-item';
import { ModalCreateBrand } from './modal-brand/modal-create-brand';

export const BrandPage = () => {
  // стейт для импута
  const [query, setQuery] = useState('');
  //обработка инпута
  const handlerInput = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  // кастомный хук useQuery,делаем запрос на получение всех брэндов
  const { data: brandData, isLoading, isError, refetch } = useBrandQuery(query);
  //т.к. при  вводе данных в поисковую строку результаты будут загружаться в реальном времени,делаем задержку
  // чтобы было меньше запросов
  useEffect(() => {
    const debounceFetch = setTimeout(() => {
      refetch();
    }, 300);

    return () => clearTimeout(debounceFetch);
  }, [query, refetch]);

  return (
    <main className=" flex flex-col gap-5">
      <h1 className=" flex justify-between items-baseline   text-zinc-800 font-semibold  leading-[130%]  text-xl lg:text-3xl">
        <span>Brands</span>
        <span className="text-lg lg:text-xl">
          {isLoading ? (
            <RotateCw size={20} className="   animate-spin" />
          ) : (
            brandData?.count
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
        <ModalCreateBrand />
      </div>

      {isError ? (
        <h1 className=" text-center font-semibold text-red-600 mt-2">
          Something went wrong!
        </h1>
      ) : isLoading ? (
        <div className=" w-[32px] lg:w-[50px] mx-auto  animate-spin">
          <Loader size={32} color="#17696a" />
        </div>
      ) : brandData.brands.length === 0 ? (
        <h1 className=" text-center font-semibold mt-2">
          The list of brands is empty !
        </h1>
      ) : (
        brandData.brands.map((brand) => {
          return (
            <div key={brand.id}>
              <BrandItem brand={brand} />
            </div>
          );
        })
      )}
    </main>
  );
};
