import { CategoryType } from '@/types/category_type';
import React, { FC } from 'react';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { useSearchParams } from 'next/navigation';
import { useChangingFilter } from './useChangingFilter';

type GenderFilterType = {
  categories: CategoryType[] | undefined;
};

export const GenderFilter: FC<GenderFilterType> = ({ categories }) => {
  const searchParams = useSearchParams();
  const { changingFilter } = useChangingFilter(); // какстомный хук для фильтрации

  return (
    <AccordionItem value="gender">
      <AccordionTrigger className=" text-zinc-800 text-base font-bold">
        Gender
      </AccordionTrigger>
      <AccordionContent>
        <ul className=" space-y-2">
          {categories?.map((item, i) => {
            return (
              <li className=" flex items-center space-x-2" key={item.id}>
                <Checkbox
                  checked={searchParams.get('categoryId') === item.id}
                  id={`gender${i}`}
                  onCheckedChange={() => changingFilter('categoryId', item.id)}
                />
                <label
                  htmlFor={`gender${i}`}
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
