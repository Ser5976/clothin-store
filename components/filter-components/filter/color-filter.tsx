import React, { FC } from 'react';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { ColorType } from '@/types/color_type';
import { useSearchParams } from 'next/navigation';
import { useChangingFilter } from './useChangingFilter';

type ColorFilterType = {
  colors: ColorType[] | undefined;
};

export const ColorFilter: FC<ColorFilterType> = ({ colors }) => {
  const searchParams = useSearchParams();
  const { changingFilter } = useChangingFilter(); // какстомный хук для фильтрации

  return (
    <AccordionItem value="color">
      <AccordionTrigger className=" text-zinc-800 text-base font-bold">
        Colors
      </AccordionTrigger>
      <AccordionContent className="custom-scroll-filter">
        <ul className=" space-y-2">
          {colors?.map((item, i) => {
            return (
              <li className=" flex items-center space-x-2" key={item.id}>
                <Checkbox
                  id={`colors${i}`}
                  checked={searchParams.getAll('colorId').includes(item.id)}
                  onCheckedChange={() => changingFilter('colorId', item.id)}
                />
                <label
                  htmlFor={`colors${i}`}
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
