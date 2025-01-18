'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useProductQuery } from '@/react-queries/admin/useProductQuery';
import { Loader, RotateCw } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { ProductItem } from './product-item';

export const ProductsPage = () => {
  // стейт для импута
  const [query, setQuery] = useState('');
  //обработка инпута
  const handlerInput = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  // кастомный хук useQuery,делаем запрос на получение всех продуктов, или , если есть поиск,одного продукта
  const {
    data: productData,
    isLoading,
    isError,
    refetch,
  } = useProductQuery(query);
  //т.к. при  вводе данных в поисковую строку результаты будут загружаться в реальном времени,делаем задержку
  // чтобы было меньше запросов
  useEffect(() => {
    const debounceFetch = setTimeout(() => {
      refetch();
    }, 300);

    return () => clearTimeout(debounceFetch);
  }, [query, refetch]);

  return (
    <main className=" flex flex-col gap-5">
      <h1 className=" flex justify-between items-baseline   text-zinc-800 font-semibold  leading-[130%]  text-xl lg:text-3xl">
        <span>Products</span>
        <span className="text-lg lg:text-xl">
          {isLoading ? (
            <RotateCw size={20} className="   animate-spin" />
          ) : (
            productData?.count
          )}
        </span>
      </h1>
      <div className=" flex justify-between">
        <div className=" relative w-[250px]">
          <Input
            type="text"
            placeholder="Search for products..."
            className="w-full pt-[11px] px-[16px] pb-[12px] rounded-[4px] border border-[#D7DADD]
        max-[450px]:w-[200px] focus:outline-none"
            value={query}
            onChange={handlerInput}
          />

          <Image
            src="/header/search.svg"
            alt="search"
            width={16}
            height={16}
            className="absolute top-[12px] right-[16px]"
          />
        </div>
        <Link href="/admin/products/create-product">
          <Button className=" text-[16px] h-[40px] bg-cyan-800 w-[180px] hover:bg-cyan-900 max-md:w-[150px] max-md:text-[14px] ">
            Add a product
          </Button>
        </Link>
      </div>

      {isError ? (
        <h1 className=" text-center font-semibold text-red-600 mt-2">
          Something went wrong!
        </h1>
      ) : isLoading ? (
        <div className=" w-[32px] lg:w-[50px] mx-auto  animate-spin">
          <Loader size={32} color="#17696a" />
        </div>
      ) : productData.products.length === 0 ? (
        <h1 className=" text-center font-semibold mt-2">
          The list of products is empty !
        </h1>
      ) : (
        <div>
          {productData.products.map((product) => {
            return <ProductItem key={product.id} product={product} />;
          })}
        </div>
      )}
    </main>
  );
};
