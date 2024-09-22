import React, { FC } from 'react';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';

import { useSearchParams } from 'next/navigation';
import { useChangingFilter } from './useChangingFilter';
import { SizeType } from '@/types/size_type';

type SizeFilterType = {
  sizes: SizeType[] | undefined;
};

export const SizeFilter: FC<SizeFilterType> = ({ sizes }) => {
  const searchParams = useSearchParams();
  const { changingFilter } = useChangingFilter(); // какстомный хук для фильтрации
  const ar = [];
  return (
    <AccordionItem value="size">
      <AccordionTrigger className=" text-zinc-800 text-base font-bold">
        Sizes
      </AccordionTrigger>
      <AccordionContent className="custom-scroll-filter">
        <ul className=" space-y-2">
          {!sizes ? (
            <div className="text-base text-red-500">Something went wrong!</div>
          ) : sizes.length === 0 ? (
            <div className="text-base">The size list is empty!</div>
          ) : (
            sizes.map((item, i) => {
              return (
                <li className=" flex items-center space-x-2" key={item.id}>
                  <Checkbox
                    id={`size${i}`}
                    checked={searchParams.getAll('sizeId').includes(item.id)}
                    onCheckedChange={() => changingFilter('sizeId', item.id)}
                  />
                  <label
                    htmlFor={`size${i}`}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {item.value}
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
