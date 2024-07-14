import { BrandType } from '@/types/brand_type';
import { CategoryType } from '@/types/category_type';
import { ColorType } from '@/types/color_type';
import { MaterialType } from '@/types/material_type';
import { SizeType } from '@/types/size_type';
import { TypeType } from '@/types/type_type';
import React, { FC, useEffect, useState } from 'react';
import { Accordion } from '@/components/ui/accordion';
import { GenderFilter } from './gender-filter';
import { useSearchParams } from 'next/navigation';
import { TypeFilter } from './type-filter';
import { BrandFilter } from './brand-filter';
import { SizeFilter } from './size-filter';
import { ColorFilter } from './color-filter';
import { MaterialFilter } from './material-filter';
import { createDefaultValue } from './createDefaultValue';
import { PriceFilter } from './price-filter';

type FilterType = {
  categories: CategoryType[] | undefined;
  materials: MaterialType[] | undefined;
  colors: ColorType[] | undefined;
  sizes: SizeType[] | undefined;
  brands: BrandType[] | undefined;
  types: TypeType[] | undefined;
};

export const Filter: FC<FilterType> = ({
  categories,
  materials,
  colors,
  sizes,
  brands,
  types,
}) => {
  const searchParams = useSearchParams();

  //стейт для дефолтных значений аккордиона
  const [defaultValue, setDefaultValue] = useState<string[]>(() =>
    createDefaultValue(searchParams)
  );
  // формируем дефолтные значения для аккордиона
  useEffect(() => {
    setDefaultValue(createDefaultValue(searchParams));
  }, [searchParams]);
  // console.log('default:', defaultValue);
  return (
    <div className="flex flex-col gap-4">
      <PriceFilter />
      <Accordion type="multiple" defaultValue={defaultValue} className="w-full">
        <GenderFilter categories={categories} />
        <TypeFilter types={types} />
        <BrandFilter brands={brands} />
        <MaterialFilter materials={materials} />
        <ColorFilter colors={colors} />
        <SizeFilter sizes={sizes} />
      </Accordion>
    </div>
  );
};
