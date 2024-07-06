import { BrandType } from '@/types/brand_type';
import { CategoryType } from '@/types/category_type';
import { ColorType } from '@/types/color_type';
import { MaterialType } from '@/types/material_type';
import { SizeType } from '@/types/size_type';
import { TypeType } from '@/types/type_type';
import React, { FC, useEffect, useState } from 'react';
import { Accordion } from '@/components/ui/accordion';
import { GenderFilter } from './gender-filter';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { TypeFilter } from './type-filter';
import { BrandFilter } from './brand-filter';
import { SizeFilter } from './size-filter';
import { ColorFilter } from './color-filter';
import { MaterialFilter } from './material-filter';
import { createParamsFilter } from './createParamsFilter';
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
export type FilterStateType = {
  gender: string | null;
  type: string[] | [];
  brand: string[] | [];
  material: string[] | [];
  size: string[] | [];
  color: string[] | [];
};

export const Filter: FC<FilterType> = ({
  categories,
  materials,
  colors,
  sizes,
  brands,
  types,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  //Т.к. в useSearchParams() 'next/navigation'мы можем только читать а изменять,добавлять не можем ,
  //мы используем метод  js new URLSearchParams()
  // добавляем в него searchParams , чтобы он знал какие параметры есть, ну дальше меняем,добавляем
  const params = new URLSearchParams(searchParams);
  //стейт для фильтров
  const [filter, setFilter] = useState<FilterStateType>(() => ({
    gender: searchParams.get('categoryId'),
    type: searchParams.getAll('typeId'),
    brand: searchParams.getAll('brandId'),
    material: searchParams.getAll('materialId'),
    size: searchParams.getAll('sizeId'),
    color: searchParams.getAll('colorId'),
  }));
  //стейт для дефолтных значений аккордиона
  const [defaultValue, setDefaultValue] = useState<string[]>(() =>
    createDefaultValue(searchParams)
  );
  console.log('filter:', filter);
  // при изменении стейта будет запускаться useEffect(), где будем проверять каждое свойство стейта
  //если там что-то есть, будем записывать или изменять параметры в адресной строке
  useEffect(() => {
    createParamsFilter({ filter, searchParams, params, pathname, router });
  }, [filter, setFilter, searchParams]);
  // формируем дефолтные значения для аккордиона
  useEffect(() => {
    setDefaultValue(createDefaultValue(searchParams));
  }, [searchParams]);
  console.log('default:', defaultValue);
  return (
    <div className="flex flex-col gap-4">
      <PriceFilter />
      <Accordion type="multiple" defaultValue={defaultValue} className="w-full">
        <GenderFilter
          categories={categories}
          setFilter={setFilter}
          filter={filter}
        />
        <TypeFilter types={types} setFilter={setFilter} filter={filter} />
        <BrandFilter setFilter={setFilter} filter={filter} brands={brands} />
        <SizeFilter setFilter={setFilter} filter={filter} sizes={sizes} />
        <ColorFilter setFilter={setFilter} filter={filter} colors={colors} />
        <MaterialFilter
          setFilter={setFilter}
          filter={filter}
          materials={materials}
        />
      </Accordion>
    </div>
  );
};
