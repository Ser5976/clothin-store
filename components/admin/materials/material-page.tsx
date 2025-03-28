'use client';
import { Input } from '@/components/ui/input';
import { useMaterialQuery } from '@/react-queries/admin/useMaterialQuery';
import { useTypeQuery } from '@/react-queries/admin/useTypeQuery';
import { Loader, RotateCw } from 'lucide-react';
import Image from 'next/image';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { MaterialItem } from './material-item';
import { ModalCreateMaterial } from './modal-material/modal-create-material';

export const MaterialPage = () => {
  // стейт для импута
  const [query, setQuery] = useState('');
  //обработка инпута
  const handlerInput = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  // кастомный хук useQuery,делаем запрос на получение всех материалов
  const {
    data: materialData,
    isLoading,
    isError,
    refetch,
  } = useMaterialQuery(query);
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
        <span>Materials</span>
        <span className="text-lg lg:text-xl">
          {isLoading ? (
            <RotateCw size={20} className="   animate-spin" />
          ) : (
            materialData?.count
          )}
        </span>
      </h1>
      <div className=" flex justify-between max-[525px]:flex-col max-[525px]:gap-4">
        <div className=" relative w-[250px]">
          <Input
            type="text"
            placeholder="Search for materials..."
            className="w-full pt-[11px] px-[16px] pb-[12px] rounded-[4px] border border-[#D7DADD]
        max-[450px]:w-[200px]  focus:outline-none"
            value={query}
            onChange={handlerInput}
          />

          <Image
            src="/header/search.svg"
            alt="search"
            width={16}
            height={16}
            className="absolute top-[12px] right-[16px] max-[450px]:right-[66px]"
          />
        </div>
        <div className="max-[525px]:w-[200px]">
          <ModalCreateMaterial />
        </div>
      </div>

      {isError ? (
        <h1 className=" text-center font-semibold text-red-600 mt-2">
          Something went wrong!
        </h1>
      ) : isLoading ? (
        <div className=" w-[32px] lg:w-[50px] mx-auto  animate-spin">
          <Loader size={32} color="#17696a" />
        </div>
      ) : materialData.materials.length === 0 ? (
        <h1 className=" text-center font-semibold mt-2">
          The list of materials is empty !
        </h1>
      ) : (
        <div>
          {materialData.materials.map((material) => {
            return (
              <div key={material.id}>
                <MaterialItem material={material} />
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
};
