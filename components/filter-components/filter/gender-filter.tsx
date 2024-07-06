import { CategoryType } from '@/types/category_type';
import React, { FC } from 'react';
import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { FilterStateType } from './filter';
import { changingFilter } from './apply-filter';

type GenderFilterType = {
  categories: CategoryType[] | undefined;
  setFilter: React.Dispatch<React.SetStateAction<FilterStateType>>;
  filter: FilterStateType;
};

export const GenderFilter: FC<GenderFilterType> = ({
  categories,
  filter,
  setFilter,
}) => {
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
                  checked={filter.gender === item.id}
                  id={`gender${i}`}
                  onCheckedChange={() =>
                    changingFilter({
                      category: 'gender',
                      filter,
                      setFilter,
                      value: item.id,
                    })
                  }
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
