import React, { FC } from 'react';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { SizeType } from '@/app/profile/get-size';
import { useSearchParams } from 'next/navigation';
import { useChangingFilter } from './useChangingFilter';

type SizeFilterType = {
  sizes: SizeType[] | undefined;
};

export const SizeFilter: FC<SizeFilterType> = ({ sizes }) => {
  const searchParams = useSearchParams();
  const { changingFilter } = useChangingFilter(); // какстомный хук для фильтрации

  return (
    <AccordionItem value="size">
      <AccordionTrigger className=" text-zinc-800 text-base font-bold">
        Sizes
      </AccordionTrigger>
      <AccordionContent className="custom-scroll-filter">
        <ul className=" space-y-2">
          {sizes?.map((item, i) => {
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
          })}
        </ul>
      </AccordionContent>
    </AccordionItem>
  );
};
