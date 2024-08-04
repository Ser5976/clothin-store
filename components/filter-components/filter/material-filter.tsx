import React, { FC, useEffect, useState } from 'react';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { MaterialType } from '@/types/material_type';
import { useSearchNameStore } from '@/stores/useSearchNameStore';
import { usePathname, useSearchParams } from 'next/navigation';
import { useChangingFilter } from './useChangingFilter';

type MaterialFilterType = {
  materials: MaterialType[] | undefined;
};

export const MaterialFilter: FC<MaterialFilterType> = ({ materials }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { changingFilter } = useChangingFilter(); // какстомный хук для фильтрации
  const searchName = useSearchNameStore((state) => state.searchName); // стейт имени поискового значения

  //это для того ,чтобы не показывать тот фильтр,который изначально выбран в поиске
  //из-за конфликта zustam c сервером приходиться кастылить с useEffect и useState
  const [name, setName] = useState('');
  let check = undefined; //это чтобы только на странице search это происходило
  useEffect(() => {
    setName(searchName);
  }, [searchName]);
  if (pathname === '/search') {
    check = materials?.find((item) => item.name === name);
  }
  //делаем проверку,если check есть, компанент фильтра не показываем
  if (check) return null;
  return (
    <AccordionItem value="material">
      <AccordionTrigger className=" text-zinc-800 text-base font-bold">
        Materials
      </AccordionTrigger>
      <AccordionContent className="custom-scroll-filter">
        <ul className=" space-y-2">
          {materials?.map((item, i) => {
            return (
              <li className=" flex items-center space-x-2" key={item.id}>
                <Checkbox
                  id={`material${i}`}
                  checked={searchParams.getAll('materialId').includes(item.id)}
                  onCheckedChange={() => changingFilter('materialId', item.id)}
                />
                <label
                  htmlFor={`material${i}`}
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
