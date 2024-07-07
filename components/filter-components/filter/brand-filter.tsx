import React, { FC,useEffect, useState  } from 'react';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { FilterStateType } from './filter';
import { changingFilter } from './apply-filter';
import { BrandType } from '@/types/brand_type';
import { useSearchNameStore } from '@/stores/useSearchNameStore';

type BrandFilterType = {
  brands: BrandType[] | undefined;
  setFilter: React.Dispatch<React.SetStateAction<FilterStateType>>;
  filter: FilterStateType;
};

export const BrandFilter: FC<BrandFilterType> = ({
  brands,
  filter,
  setFilter,
}) => {
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
                  checked={filter.brand.includes(item.id as never)}
                  id={`brand${i}`}
                  onCheckedChange={() =>
                    changingFilter({
                      category: 'brand',
                      filter,
                      setFilter,
                      value: item.id,
                    })
                  }
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
