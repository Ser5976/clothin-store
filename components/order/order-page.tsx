'use client';
import { OrderType } from '@/types/order_type';
import { useSession } from 'next-auth/react';
import { ItemReview } from './item-review';
import styles from './order-page.module.css';
import { OrderSkeleton } from './order-sekelton';

export const OrderPage = ({ order }: { order: OrderType }) => {
  //проверка авторизации
  const { status } = useSession();
  const isAuth = status === 'authenticated';
  const isLoadingAuth = status === 'loading';

  return (
    <section>
      <h1 className={styles.title}>Order</h1>
      <div className={styles.divider}></div>
      <div className={styles.container}>
        <div className={styles.left}>
          <div>
            <div className={styles.subtitle}>Your Order</div>
            {isLoadingAuth || (isAuth && order.orderItems.length === 0) ? (
              <OrderSkeleton />
            ) : (
              <div className=" flex flex-col bg-neutral-100 rounded px-1 ">
                {order.orderItems.map((item) => {
                  return <ItemReview item={item} key={item.id} />;
                })}
                <div className=" flex flex-col gap-[2%] items-end py-[1%] px-[3%]">
                  <div className=" text-gray-700 text-sm lg:text-base leading-relaxed">
                    subtotal: $ {order.subtotal}
                  </div>
                  <div className=" text-gray-700 text-sm lg:text-base leading-relaxed">
                    shipping cost: $ {order.shippingCost}
                  </div>
                  <div className="text-gray-700 text-sm lg:text-base leading-relaxed">
                    discount:{' '}
                    {Number(order.discount) ? (
                      <span>$ {order.discount}</span>
                    ) : (
                      <span>-</span>
                    )}
                  </div>
                  <div className="text-zinc-800 text-base lg:text-lg xl:text-xl font-bold leading-[27px]">
                    Total price: $ {String(order.amount)}
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className={`${styles.divider} md:hidden`}></div>
        </div>
        <div className={styles.right}>
          {order.isPaid ? (
            <div className=" text-green-500 text-lg  lg:text-xl xl:text-2xl font-bold">
              Your order has been accepted,thanks for the purchase!
            </div>
          ) : (
            <div className=" text-red-500 text-lg  lg:text-xl xl:text-2xl font-bold">
              Your order has not been accepted,sorry!
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
