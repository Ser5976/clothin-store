'use client';
import { useProductFilterQuery } from '@/react-queries/useProductFilterQuery';
import { BrandType } from '@/types/brand_type';
import { CategoryType } from '@/types/category_type';
import { ColorType } from '@/types/color_type';
import { MaterialType } from '@/types/material_type';
import { SizeType } from '@/types/size_type';
import { Loader } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import React, { FC, useEffect } from 'react';
import { FilterComponent } from '../filter-components/filter-component';

type PopularPageType = {
  categories: CategoryType[] | undefined;
  materials: MaterialType[] | undefined;
  colors: ColorType[] | undefined;
  sizes: SizeType[] | undefined;
  brands: BrandType[] | undefined;
  typeName: string | undefined;
};

export const PopularTypePage: FC<PopularPageType> = ({
  categories,
  materials,
  colors,
  sizes,
  brands,
  typeName,
}) => {
  //получаем параметры запроса
  const searchParams = useSearchParams();

  const session = useSession();
  // делаем запрос  в базу данных для получения отфильтрованных продуктов, если квэри параметров нет(typeName)
  // блокируем запрос
  // кастомный хук useQuery
  const { data, isError, isLoading, refetch } = useProductFilterQuery(
    searchParams,
    !!typeName
  );
  useEffect(() => {
    if (typeName) refetch();
  }, [searchParams]);
  // console.log('data-filter:', data);
  //определяем имя  типа одежды

  // если квэри параметров нет, рэндерим только это
  if (!typeName)
    return (
      <div className=" text-center pt-32 text-red-500 text-xl">
        The popular categories is not selected
      </div>
    );
  // console.log('hasAnyParams:', hasAnyParams);
  return (
    <div className="shared_container  pt-[2%] pb-[5%]">
      {session.status === 'loading' ? (
        <div className=" w-[32px] lg:w-[50px] mx-auto my-[300px] animate-spin">
          <Loader size={32} color="#17696a" />
        </div>
      ) : (
        <>
          <div className="mb-[2%]">
            <span
              className="text-zinc-800 text-sm sm:text-base md:text-lg  lg:text-xl xl:text-2xl
           font-bold leading-[31.20px] "
            >
              {typeName}
            </span>
          </div>
          <FilterComponent
            isError={isError}
            isLoading={isLoading}
            filteredProducts={data}
            categories={categories}
            materials={materials}
            colors={colors}
            types={undefined}
            brands={brands}
            sizes={sizes}
          />
        </>
      )}
    </div>
  );
};
