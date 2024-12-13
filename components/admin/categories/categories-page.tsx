'use client';
import { useCategoryQuery } from '@/react-queries/admin/useCategoryrQuery';
import { Loader, RotateCw } from 'lucide-react';
import React from 'react';
import { CategoryItem } from './category-item';
import { ModalCreateCategory } from './modal-category/modal-create-category';

export const CategoryPage = () => {
  // кастомный хук useQuery,делаем запрос на получение всех категорий
  const { data: categoriesList, isLoading, isError } = useCategoryQuery();

  return (
    <main className=" flex flex-col gap-5">
      <h1 className=" flex justify-between items-baseline   text-zinc-800 font-semibold  leading-[130%]  text-xl lg:text-3xl">
        <span>Categories</span>
        <span className="text-lg lg:text-xl">
          {isLoading ? (
            <RotateCw size={20} className="   animate-spin" />
          ) : (
            categoriesList?.length
          )}
        </span>
      </h1>
      <div className=" flex justify-end">
        <ModalCreateCategory />
      </div>

      {isError ? (
        <h1 className=" text-center font-semibold text-red-600 mt-2">
          Something went wrong!
        </h1>
      ) : isLoading ? (
        <div className=" w-[32px] lg:w-[50px] mx-auto  animate-spin">
          <Loader size={32} color="#17696a" />
        </div>
      ) : categoriesList.length === 0 ? (
        <h1 className=" text-center font-semibold mt-2">
          The list of types is empty !
        </h1>
      ) : (
        <div>
          {categoriesList.map((category) => {
            return (
              <div key={category.id}>
                <CategoryItem category={category} />
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
};
