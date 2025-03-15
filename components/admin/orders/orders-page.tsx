'use client';
import { Input } from '@/components/ui/input';
import { useOrdersQuery } from '@/react-queries/admin/useOrdersQuery';
import { Loader, RotateCw } from 'lucide-react';
import Image from 'next/image';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { OrderItem } from './order-item';

export const OrdersPage = () => {
  // стейт для импута
  const [query, setQuery] = useState('');
  //обработка инпута
  const handlerInput = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };
  // кастомный хук useQuery,делаем запрос на получение всех заказов
  const {
    data: orderData,
    isLoading,
    isError,
    refetch,
  } = useOrdersQuery(query);
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
        <span>Orders</span>
        <span className="text-lg lg:text-xl">
          {isLoading ? (
            <RotateCw size={20} className="   animate-spin" />
          ) : (
            orderData?.count
          )}
        </span>
      </h1>
      <div className=" flex justify-between">
        <div className=" relative w-[250px]">
          <Input
            type="text"
            placeholder="Search for orders..."
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
      </div>

      {isError ? (
        <h1 className=" text-center font-semibold text-red-600 mt-2">
          Something went wrong!
        </h1>
      ) : isLoading ? (
        <div className=" w-[32px] lg:w-[50px] mx-auto  animate-spin">
          <Loader size={32} color="#17696a" />
        </div>
      ) : orderData.orders.length === 0 ? (
        <h1 className=" text-center font-semibold mt-2">
          The list of orders is empty !
        </h1>
      ) : (
        <div>
          {orderData.orders.map((order) => {
            return (
              <div key={order.id}>
                <OrderItem order={order} />
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
};
