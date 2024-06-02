import { DeliveryType } from '@/types/delivery_type';
import React, { FC } from 'react';
import { Button } from '../ui/button';

type OrderTotalsType = {
  subtotal: number;
  oldSubtotal: number;
  delivery: DeliveryType[];
  standartPrice: boolean;
};

export const OrderTotals: FC<OrderTotalsType> = ({
  subtotal,
  delivery,
  standartPrice,
  oldSubtotal,
}) => {
  //определяем стоимость доставки
  const shippingCosts =
    Number(delivery[0].orderPrice) <= subtotal && standartPrice ? (
      <span> free</span>
    ) : standartPrice ? (
      <span>${delivery[0].standartPrice}</span>
    ) : (
      <span>${delivery[0].expressPrice}</span>
    );
  //вычисляем скидку
  const discount = oldSubtotal ? oldSubtotal - subtotal : 0;
  //вычисляем общую сумму
  const orderTotal =
    subtotal +
    (standartPrice
      ? Number(delivery[0].standartPrice)
      : Number(delivery[0].expressPrice));
  return (
    <>
      <div className="w-full  bg-neutral-100 rounded flex-col justify-start items-start inline-flex ">
        <div className="w-full text-zinc-800 font-bold p-[5%] border-b border-gray-200 text-lg lg:text-xl ">
          Order totals
        </div>
        <div className=" w-full flex flex-col py-[2%]">
          <div className=" flex w-full justify-between text-gray-700 text-sm lg:text-base font-bold  leading-relaxed px-[5%] py-[2%]">
            <span>Subtotal:</span>
            <span>$ {subtotal}</span>
          </div>
          <div className=" flex w-full justify-between text-gray-700 text-sm lg:text-base leading-relaxed px-[5%] py-[2%]">
            <span>Shipping costs:</span>
            {shippingCosts}
          </div>
          <div className=" flex w-full justify-between text-gray-700 text-sm lg:text-base  leading-relaxed px-[5%] py-[2%]">
            <span> Discount:</span>
            {discount ? (
              <span>$ {discount}</span>
            ) : (
              <span className=" text-lg">-</span>
            )}
          </div>
        </div>

        <div className=" flex w-full justify-between text-zinc-800 font-bold p-[5%] border-t border-gray-200 text-base lg:text-lg ">
          <span>Order total</span>
          <span>$ {orderTotal}</span>
        </div>
      </div>
      <Button
        size="lg"
        className="text-white text-base font-bold bg-cyan-800 rounded mt-5 md:mt-0 h-12"
      >
        Complete order
      </Button>
    </>
  );
};
