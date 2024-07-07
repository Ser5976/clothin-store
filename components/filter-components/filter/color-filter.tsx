import React, { FC } from 'react';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { FilterStateType } from './filter';
import { changingFilter } from './apply-filter';
import { ColorType } from '@/types/color_type';

type ColorFilterType = {
  colors: ColorType[] | undefined;
  setFilter: React.Dispatch<React.SetStateAction<FilterStateType>>;
  filter: FilterStateType;
};

export const ColorFilter: FC<ColorFilterType> = ({
  colors,
  filter,
  setFilter,
}) => {
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
                  checked={filter.color.includes(item.id as never)}
                  id={`colors${i}`}
                  onCheckedChange={() =>
                    changingFilter({
                      category: 'color',
                      filter,
                      setFilter,
                      value: item.id,
                    })
                  }
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
