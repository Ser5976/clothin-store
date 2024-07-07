import { useSearchNameStore } from '@/stores/useSearchNameStore';
import React, { FC, useEffect, useState } from 'react';
import { SerchTitleSkeleton } from './search-title-skeleton';

type SearchTitleType = {
  quantity: number | undefined;
  isError: boolean;
  isLoading: boolean;
};
export const SearchTitle: FC<SearchTitleType> = ({
  quantity,
  isError,
  isLoading,
}) => {
  //из-за конфликта zustam c сервером приходиться кастылить с useEffect и useState
  const [name, setName] = useState('');
  const searchName = useSearchNameStore((state) => state.searchName);
  useEffect(() => {
    setName(searchName);
  }, [searchName]);
  return (
    <>
      {isError ? (
        <h1 className=" text-red-500 text-sm sm:text-base md:text-lg  lg:text-xl xl:text-2xl font-bold leading-[31.20px] mb-[2%]">
          Something went wrong
        </h1>
      ) : isLoading ? (
        <SerchTitleSkeleton />
      ) : (
        <h1 className=" flex gap-2 items-baseline flex-wrap mb-[2%]">
          <span className="text-zinc-800 text-sm sm:text-base md:text-lg  lg:text-xl xl:text-2xl font-bold leading-[31.20px]">
            Products on request "{name}"
          </span>
          <span className=" hidden md:block text-zinc-500 text-xs lg:text-sm xl:text-base">
            products found {quantity}
          </span>
          <span className="text-zinc-500 text-xs lg:text-sm xl:text-base md:hidden">
            ({quantity})
          </span>
        </h1>
      )}
    </>
  );
};
