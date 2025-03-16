'use client';
import { useProductQuery } from '@/react-queries/admin/useProductQuery';
import { Loader } from 'lucide-react';
import React from 'react';
import { ProductForm } from './product-form';

export const UpdateProductPage = ({ productId }: { productId: string }) => {
  // кастомный хук useQuery,делаем запрос на получение выбранной продукта
  const { data: product, isLoading, isError } = useProductQuery(productId);
  return (
    <main className=" flex flex-col gap-4">
      {isError ? (
        <h1 className=" text-center font-semibold text-red-600 mt-2">
          Something went wrong!
        </h1>
      ) : isLoading ? (
        <div className=" w-[32px] lg:w-[50px] mx-auto  animate-spin">
          <Loader size={32} color="#17696a" />
        </div>
      ) : (
        <div className="">
          <h1 className="   text-zinc-800 font-semibold  leading-[130%]  text-xl lg:text-3xl">
            Update Product
          </h1>
          <ProductForm product={product} />
        </div>
      )}
    </main>
  );
};
