import React, { FC, useEffect, useState } from 'react';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { TypeType } from '@/types/type_type';
import { useSearchNameStore } from '@/stores/useSearchNameStore';
import { usePathname, useSearchParams } from 'next/navigation';
import { useChangingFilter } from './useChangingFilter';

type TypeFilterType = {
  types: TypeType[] | undefined;
};

export const TypeFilter: FC<TypeFilterType> = ({ types }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { changingFilter } = useChangingFilter(); // какстомный хук для фильтрации
  const searchName = useSearchNameStore((state) => state.searchName); // стейт имени поискового значения

  //это для того ,чтобы не показывать тот фильтр, который изначально выбран в поиске
  //из-за конфликта zustam c сервером приходиться кастылить с useEffect и useState
  const [name, setName] = useState('');
  let check = undefined; //это чтобы только на странице search это происходило
  useEffect(() => {
    setName(searchName);
  }, [searchName]);
  if (pathname === '/search') {
    check = types?.find((item) => item.name === name);
  }
  //делаем проверку,если check есть, компанент фильтра не показываем
  if (check) return null;

  return (
    <AccordionItem value="clothes">
      <AccordionTrigger className=" text-zinc-800 text-base font-bold">
        Clothes
      </AccordionTrigger>
      <AccordionContent className="custom-scroll-filter">
        <ul className=" space-y-2">
          {!types ? (
            <div className="text-base text-red-500">Something went wrong!</div>
          ) : types.length === 0 ? (
            <div className="text-base">The clothes list is empty!</div>
          ) : (
            types.map((item, i) => {
              return (
                <li className=" flex items-center space-x-2" key={item.id}>
                  <Checkbox
                    checked={searchParams
                      .getAll('typeId')
                      .includes(item.id as never)}
                    id={`type${i}`}
                    onCheckedChange={() => changingFilter('typeId', item.id)}
                  />
                  <label
                    htmlFor={`type${i}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {item.name}
                  </label>
                </li>
              );
            })
          )}
        </ul>
      </AccordionContent>
    </AccordionItem>
  );
};
