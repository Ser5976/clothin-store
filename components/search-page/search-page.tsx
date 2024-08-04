'use client';
import { useProductFilterQuery } from '@/react-queries/useProductFilterQuery';
import { BrandType } from '@/types/brand_type';
import { CategoryType } from '@/types/category_type';
import { ColorType } from '@/types/color_type';
import { MaterialType } from '@/types/material_type';
import { SizeType } from '@/types/size_type';
import { TypeType } from '@/types/type_type';
import { Loader } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import React, { FC, useEffect } from 'react';
import { FilterComponent } from '../filter-components/filter-component';
import { SearchTitle } from './search-title';

type SearchPageType = {
  categories: CategoryType[] | undefined;
  materials: MaterialType[] | undefined;
  colors: ColorType[] | undefined;
  sizes: SizeType[] | undefined;
  brands: BrandType[] | undefined;
  types: TypeType[] | undefined;
};

export const SearchPage: FC<SearchPageType> = ({
  categories,
  materials,
  colors,
  sizes,
  brands,
  types,
}) => {
  //получаем параметры запроса
  const searchParams = useSearchParams();
  const session = useSession();
  // console.log('categories:', categories);
  // делаем запрос  в базу данных для получения отфильтрованных продуктов
  // кастомный хук useQuery
  const { data, isError, isLoading, refetch } =
    useProductFilterQuery(searchParams);
  useEffect(() => {
    refetch();
  }, [searchParams]);
  // console.log('data-filter:', data);
  return (
    <div className="shared_container  pt-[2%] pb-[5%]">
      {session.status === 'loading' ? (
        <div className=" w-[32px] lg:w-[50px] mx-auto my-[300px] animate-spin">
          <Loader size={32} color="#17696a" />
        </div>
      ) : (
        <>
          <SearchTitle
            quantity={data?.count}
            isError={isError}
            isLoading={isLoading}
          />
          <FilterComponent
            isError={isError}
            isLoading={isLoading}
            filteredProducts={data}
            categories={categories}
            materials={materials}
            colors={colors}
            types={types}
            brands={brands}
            sizes={sizes}
          />
        </>
      )}
    </div>
  );
};
