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

type CategoryPageType = {
  categories: CategoryType[] | undefined;
  materials: MaterialType[] | undefined;
  colors: ColorType[] | undefined;
  sizes: SizeType[] | undefined;
  brands: BrandType[] | undefined;
};

export const CategoryPage: FC<CategoryPageType> = ({
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
  // делаем запрос  в базу данных для получения отфильтрованных продуктов, если квэри параметров нет(hasAnyParams=false)
  // блокируем запрос
  // кастомный хук useQuery
  const { data, isError, isLoading, refetch } = useProductFilterQuery(
    searchParams,
    hasAnyParams
  );
  useEffect(() => {
    if (hasAnyParams) refetch();
  }, [searchParams]);
  // console.log('data-filter:', data);
  //определяем имя категории и тип одежды
  const findFilterNames = (): {
    category: string | undefined;
    type: string | undefined;
  } => {
    const selectCategory = categories?.find(
      (category) => category.id === searchParams.get('categoryId')
    );
    const selectType = selectCategory?.types.find(
      (type) => type.id === searchParams.get('typeId')
    );
    return { category: selectCategory?.name, type: selectType?.name };
  };
  // если квэри параметров нет, рэндерим только это
  if (!hasAnyParams)
    return (
      <div className=" text-center pt-32 text-red-500 text-xl">
        The category is not selected
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
              {findFilterNames().category ? findFilterNames().category : null}
            </span>
            <span
              className="text-zinc-800 text-sm sm:text-base md:text-lg  lg:text-xl xl:text-2xl
              font-bold leading-[31.20px] "
            >
              {findFilterNames().type ? '/' : null}
            </span>
            <span
              className="text-zinc-800 text-sm sm:text-base md:text-lg  lg:text-xl xl:text-2xl
              font-bold leading-[31.20px] lowercase "
            >
              {findFilterNames().type ? findFilterNames().type : null}
            </span>
          </div>
          <FilterComponent
            isError={isError}
            isLoading={isLoading}
            filteredProducts={data}
            categories={undefined}
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
