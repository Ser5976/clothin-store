import React, { FC, useEffect, useState } from 'react';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { BrandType } from '@/types/brand_type';
import { useSearchNameStore } from '@/stores/useSearchNameStore';
import { useSearchParams } from 'next/navigation';
import { useChangingFilter } from './useChangingFilter';

type BrandFilterType = {
  brands: BrandType[] | undefined;
};

export const BrandFilter: FC<BrandFilterType> = ({ brands }) => {
  const searchParams = useSearchParams();
  const { changingFilter } = useChangingFilter(); // какстомный хук для фильтрации

  //это для того ,чтобы не показывать тот фильтр, котой изначально есть
  //из-за конфликта zustam c сервером приходиться кастылить с useEffect и useState
  const [name, setName] = useState('');
  const searchName = useSearchNameStore((state) => state.searchName);
  useEffect(() => {
    setName(searchName);
  }, [searchName]);
  const check = brands?.find((item) => item.name === name);
  if (check) return null;

  return (
    <AccordionItem value="brand">
      <AccordionTrigger className=" text-zinc-800 text-base font-bold">
        Brands
      </AccordionTrigger>
      <AccordionContent className="custom-scroll-filter">
        <ul className=" space-y-2">
          {brands?.map((item, i) => {
            return (
              <li className=" flex items-center space-x-2" key={item.id}>
                <Checkbox
                  id={`brand${i}`}
                  checked={searchParams.getAll('brandId').includes(item.id)}
                  onCheckedChange={() => changingFilter('brandId', item.id)}
                />
                <label
                  htmlFor={`brand${i}`}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {item.name}
                </label>
              </li>
            );
          })}
        </ul>
      </AccordionContent>
    </AccordionItem>
  );
};