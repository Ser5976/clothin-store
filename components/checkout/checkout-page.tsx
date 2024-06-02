'use client';
import { useCartStore } from '@/stores/useCartStore';
import { CartItemType } from '@/types/cart_type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CheckoutForm } from './checkout-form/checkout-form';
import { CheckoutSkeleton } from './checkout-sekelton';
import { FormSchema, FormSchemaType } from './form-schema';
import { ItemReview } from './item-review/item-review';
import styles from './checkout-page.module.css';
import { OrderTotals } from './order-totals';
import { DeliveryType } from '@/types/delivery_type';
import { useOrderPost } from '@/react-queries/useOrderPost';

export const CheckoutPage = ({ delivery }: { delivery: DeliveryType[] }) => {
  //проверка авторизации
  const { status } = useSession();
  const isAuth = status === 'authenticated';
  const isLoadingAuth = status === 'loading';
  // для редиректа на логин и обратно при авторизации
  const path = usePathname();
  // для редиректа на главную, если нет товаров
  const route = useRouter();
  //получение данных корзины из стора
  const {
    refetch,
    cartItems,
    cartBase,
    sumTotalPrice,
    sumTotalOldPrice,
    updateQuantityProduct,
    deleteProduct,
  } = useCartStore((state) => state);
  //выбор места откуда берём массив товаров корзины(база или стор)
  // делаем это при помощи useEffect,чтобы избежать конфликта с сервером(useStore из zustand не помогает)
  const [selectedProducts, setSelectedProducts] = useState<CartItemType[]>([]);

  useEffect(() => {
    if (isAuth) {
      if (!cartBase.cart || cartBase.cart.items.length === 0) {
        route.push('/');
      } else {
        setSelectedProducts(cartBase.cart ? cartBase.cart.items : []);
      }
    } else {
      if (cartItems.length === 0) {
        route.push('/');
      } else {
        setSelectedProducts(cartItems);
      }
    }
  }, [isAuth, cartBase, cartItems]);

  //кастомный хук useMutation,добавляет заказ в базу
  const mutationPostOrder = useOrderPost();

  //подключаем react-hook-form
  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      country: '',
      city: '',
      street: '',
      house: '',
      flat: '',
      postalCode: '',
      type: '5',
    },
  });

  //определяем,когда будет выбран метод доставки standartPrice
  const standartPrice = form.watch('type') === delivery[0].standartPrice;
  //вычисляем общую сумму
  const subtotal = isAuth
    ? cartBase.sumTotalPrice
      ? cartBase.sumTotalPrice
      : 0
    : sumTotalPrice;

  const orderTotal =
    subtotal +
    (standartPrice
      ? Number(delivery[0].standartPrice)
      : Number(delivery[0].expressPrice));

  const onSubmit = async (data: FormSchemaType) => {
    const order = {
      email: data.email,
      phone: data.phone,
      firstName: data.firstName,
      lastName: data.lastName,
      amount: orderTotal,
      address: {
        country: data.country,
        city: data.city,
        street: data.street,
        house: data.house,
        flat: data.flat,
        postalCode: data.postalCode,
      },
      orderItems: selectedProducts.map((orderItem) => {
        return { productId: orderItem.productId, quantity: orderItem.quantity };
      }),
    };
    console.log('order:', order);
    const request = await mutationPostOrder.mutateAsync(order);
    console.log('заказ:', request.confirmation.confirmation_url);
    route.push(request.confirmation.confirmation_url);
  };

  return (
    <section>
      <form onSubmit={form.handleSubmit(onSubmit)} className={styles.container}>
        <div className={styles.left}>
          <h1 className={styles.title}>Checkout</h1>
          <div className={styles.sigin}>
            <Image
              src="/checkout/Person.svg"
              alt="login"
              width={14}
              height={14}
            />

            <div>Already have an account? </div>
            <Link
              href={`/signin?callbackUrl=${path}`}
              className=" font-bold underline"
            >
              Sign in
            </Link>
            {/* <div> for faster checkout experience</div> */}
          </div>
          <div className={styles.divider}></div>
          <div>
            <div className={styles.title}>1. Item Review</div>
            {isLoadingAuth || (isAuth && !cartBase.sumTotalPrice) ? (
              <CheckoutSkeleton />
            ) : (
              <div className=" flex flex-col bg-neutral-100 rounded px-1 mb-[3%]">
                {selectedProducts.map((item) => {
                  return (
                    <ItemReview
                      item={item}
                      key={item.productId}
                      isAuth={isAuth}
                      refetch={refetch}
                      updateQuantityProduct={updateQuantityProduct}
                      deleteProduct={deleteProduct}
                    />
                  );
                })}
                <div className={styles.subtotal}>
                  Subtotal: $
                  {selectedProducts.length !== 0 &&
                    (isAuth ? cartBase.sumTotalPrice : sumTotalPrice)}
                </div>
              </div>
            )}
          </div>
          <div className={styles.divider}></div>
          <div>
            <div className={styles.title}>
              2. Shipping Address & Shipping Method
            </div>
            <CheckoutForm form={form} delivery={delivery} />
          </div>
        </div>
        <div className={styles.right}>
          <OrderTotals
            subtotal={
              isAuth
                ? cartBase.sumTotalPrice
                  ? cartBase.sumTotalPrice
                  : 0
                : sumTotalPrice
            }
            oldSubtotal={
              isAuth
                ? cartBase.sumTotalOldPrice
                  ? cartBase.sumTotalOldPrice
                  : 0
                : sumTotalOldPrice
                ? sumTotalOldPrice
                : 0
            }
            delivery={delivery}
            standartPrice={standartPrice}
          />
        </div>
      </form>
    </section>
  );
};
