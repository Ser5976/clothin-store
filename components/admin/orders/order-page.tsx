'use client';
import { ItemReview } from '@/components/order/item-review';
import { useOrderQuery } from '@/react-queries/admin/useOrderQuery';
import { Divide, Loader } from 'lucide-react';

import React from 'react';

function OrderPage({ orderId }: { orderId: string }) {
  // кастомный хук useQuery,делаем запрос на получение выбранного  заказа
  const { data: order, isLoading, isError } = useOrderQuery(orderId);
  return (
    <main className="">
      {isError ? (
        <h1 className=" text-center font-semibold text-red-600 mt-2">
          Something went wrong!
        </h1>
      ) : isLoading ? (
        <div className=" w-[32px] lg:w-[50px] mx-auto  animate-spin">
          <Loader size={32} color="#17696a" />
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <h1 className=" flex justify-between items-baseline   text-zinc-800 font-semibold  leading-[130%]  text-xl lg:text-3xl">
            <div className=""> Order {order?.email}</div>
            <div className=" text-green-400">
              {order?.isPaid ? 'paid for' : 'not paid for'}
            </div>
          </h1>

          <div>
            {order?.orderItems.map((item) => {
              return <ItemReview item={item} key={item.id} />;
            })}
          </div>
        </div>
      )}
    </main>
  );
}

export default OrderPage;
