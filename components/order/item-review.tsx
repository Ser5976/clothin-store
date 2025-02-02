import { CartItemType } from '@/types/cart_type';
import { OrderItem, OrderType } from '@/types/order_type';
import Image from 'next/image';
import Link from 'next/link';
import { FC } from 'react';
import styles from './order-page.module.css';

type ItemReviewPropsType = {
  item: OrderItem;
};

export const ItemReview: FC<ItemReviewPropsType> = ({ item }) => {
  return (
    <div className="flex py-4 border-b border-slate-200 last:border-none gap-[3%] ">
      <Link
        href={`/${item.productId}`}
        className=" w-[15%] h-[15%] cursor-pointer"
      >
        <Image
          className="h-full w-full object-cover rounded"
          src={item.image}
          width={200}
          height={200}
          alt="Picture of the author"
          quality={100}
          priority
        />
      </Link>

      <div className=" flex gap-1 w-[75%]">
        <div className=" flex flex-col gap-2 w-[45%]">
          <div className="text-zinc-800 text-sm font-bold md:text-base lg:text-lg">
            {item.name}
          </div>
          <div className="text-zinc-500 text-xs">
            Color:<span className="text-gray-700 text-xs ">{item.color}</span>
          </div>
          <div className="text-zinc-500 text-xs">
            Size:<span className="text-gray-700 text-xs ">{item.size}</span>
          </div>
        </div>

        <div className=" w-[25%] flex gap-10">
          <div className={styles.quantity_wrapper}>
            <div className={styles.quantity}>{item.quantity}</div>
          </div>
        </div>
        <div className=" w-[30%] flex gap-1 justify-end">
          <div className="text-red-500 text-base font-bold ">
            ${item.totalPrice}
          </div>
          {item.totalOldPrice > 0 && (
            <div className="text-zinc-500 text-xs line-through">
              ${item.totalOldPrice}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
