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

type CollectionPageType = {
  types: TypeType[] | undefined;
  categories: CategoryType[] | undefined;
  materials: MaterialType[] | undefined;
  colors: ColorType[] | undefined;
  sizes: SizeType[] | undefined;
  brands: BrandType[] | undefined;
  collectionName: string;
};

export const CollectionPage: FC<CollectionPageType> = ({
  collectionName,
  types,
  categories,
  materials,
  colors,
  sizes,
  brands,
}) => {
  //получаем параметры запроса
  const searchParams = useSearchParams();
  //проверка на наличие квэри параметров
  const hasAnyParams = [...searchParams.entries()].length > 0;
  const session = useSession();
  // console.log('categories:', categories);
  // делаем запрос  в базу данных для получения отфильтрованных продуктов
  // кастомный хук useQuery
  const { data, isError, isLoading, refetch } = useProductFilterQuery(
    searchParams,
    hasAnyParams
  );
  useEffect(() => {
    if (hasAnyParams) refetch();
  }, [searchParams]);
  // console.log('data-filter:', data);
  // если квэри параметров нет, рэндерим только это
  if (!hasAnyParams)
    return (
      <div className=" text-center pt-32 text-red-500 text-xl">
        The collection is not selected
      </div>
    );
  return (
    <div className="shared_container  pt-[2%] pb-[5%]">
      {session.status === 'loading' ? (
        <div className=" w-[32px] lg:w-[50px] mx-auto my-[300px] animate-spin">
          <Loader size={32} color="#17696a" />
        </div>
      ) : (
        <>
          <h1
            className="text-zinc-800 text-sm sm:text-base md:text-lg  lg:text-xl xl:text-2xl
           font-bold leading-[31.20px] mb-[2%]"
          >
            {collectionName}
          </h1>
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