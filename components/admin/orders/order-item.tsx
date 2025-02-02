import React from 'react';
import { dateFormatting } from './../../../utils/date-formatting';
import { OrderType } from '@/types/order_type';
import Link from 'next/link';

export const OrderItem = ({ order }: { order: OrderType }) => {
  return (
    <div className=" flex items-center justify-between border-t border-gray-400  text-gray-400 h-10 ">
      <Link href={`/admin/orders/${order.id}`}>{order.email}</Link>

      <div className=" ">{dateFormatting(String(order.createdAt))}</div>
    </div>
  );
};
