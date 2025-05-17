'use client';
import { useBillboardQuery } from '@/react-queries/admin/useBillboardQuery';
import { useDeliveryrQuery } from '@/react-queries/admin/useDeliveryQuery';
import { Loader } from 'lucide-react';
import React from 'react';
import { DeliveryItem } from './delivery-item';
import { ModalCreateDelivery } from './modal-delivery/modal-create-delivery';

export const DeliveryPage = () => {
  // кастомный хук useQuery,делаем запрос на получение всех информации о доставке
  const { data: delivery, isLoading, isError } = useDeliveryrQuery();

  return (
    <main className=" flex flex-col gap-5">
      <h1 className="    text-zinc-800 font-semibold  leading-[130%]  text-xl lg:text-3xl">
        <span>Delivery</span>
      </h1>
      <div className=" flex justify-end">
        {!delivery ? null : delivery.length ? null : (
          <ModalCreateDelivery delivery={undefined} />
        )}
      </div>

      {isError ? (
        <h1 className=" text-center font-semibold text-red-600 mt-2">
          Something went wrong!
        </h1>
      ) : isLoading ? (
        <div className=" w-[32px] lg:w-[50px] mx-auto  animate-spin">
          <Loader size={32} color="#17696a" />
        </div>
      ) : (
        <div>
          {delivery.length ? (
            delivery.map((delivery) => {
              return (
                <div key={delivery.id}>
                  <DeliveryItem delivery={delivery} />
                </div>
              );
            })
          ) : (
            <div className=" flex items-center justify-between border-t border-gray-400  text-gray-400 h-10 ">
              <div>Delivery information</div>{' '}
            </div>
          )}
        </div>
      )}
    </main>
  );
};
