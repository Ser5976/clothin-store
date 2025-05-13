'use client';
import { useCartStore } from '@/stores/useCartStore';
import { CartItemType } from '@/types/cart_type';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { CheckoutForm } from './checkout-form';
import { CheckoutSkeleton } from './checkout-sekelton';
import { FormSchema, FormSchemaType } from './form-schema';
import { ItemReview } from './item-review';
import styles from './checkout-page.module.css';
import { OrderTotals } from './order-totals';
import { EditedDeliveryType } from '@/types/delivery_type';
import { useOrderPost } from '@/react-queries/useOrderPost';
import { Form } from '../ui/form';
import { toast } from 'react-toastify';

type SelectedOrderType = {
  items: CartItemType[];
  sumTotalPrice: number;
  sumTotalOldPrice: number;
};
export const CheckoutPage = ({
  delivery,
}: {
  delivery: EditedDeliveryType;
}) => {
  //проверка авторизации
  const { status } = useSession();
  const isAuth = status === 'authenticated';
  const isLoadingAuth = status === 'loading';
  // для редиректа на логин и обратно при авторизации
  // для редиректа на главную, если нет товаров
  const route = useRouter();
  //получение данных корзины из стора
  const { refetch, cartBase, updateQuantityProduct, deleteProduct } =
    useCartStore((state) => state);
  //выбор места откуда берём массив товаров корзины(база или стор)
  // делаем это при помощи useEffect,чтобы избежать конфликта с сервером(useStore из zustand не помогает)
  const [selectedOrder, setSelectedOrder] = useState<SelectedOrderType>(() => ({
    items: [],
    sumTotalPrice: 0,
    sumTotalOldPrice: 0,
  }));

  useEffect(() => {
    if (cartBase.cart?.items.length === 0) {
      route.push('/');
      return;
    }

    setSelectedOrder({
      ...selectedOrder,
      items: cartBase.cart ? cartBase.cart.items : [],
      sumTotalPrice: cartBase.sumTotalPrice ? cartBase.sumTotalPrice : 0,
      sumTotalOldPrice: cartBase.sumTotalOldPrice
        ? cartBase.sumTotalOldPrice
        : 0,
    });
  }, [isAuth, cartBase]);
  console.log('render checkout');

  //кастомный хук useMutation,добавляет заказ в базу
  const mutationPostOrder = useOrderPost();
  mutationPostOrder.isError;

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
      type: delivery.standartPrice,
    },
  });

  //определяем,когда будет выбран метод доставки standartPrice, используем в условии для определение цены доставки
  const deliveryPrice = form.watch('type');
  console.log('type:', deliveryPrice);

  //вычисляем общую сумму
  const orderTotal =
    selectedOrder.sumTotalPrice +
    (Number(delivery.orderPrice) <= selectedOrder.sumTotalPrice
      ? 0
      : Number(deliveryPrice));

  //вычисляем скидку
  const discount = selectedOrder.sumTotalOldPrice
    ? selectedOrder.sumTotalOldPrice - selectedOrder.sumTotalPrice
    : null;

  //отправляем заказ в базу и данные в ю-кассу,получаем ссылку от ю-кассы и редиректим на ю-кассу
  const onSubmit = async (data: FormSchemaType) => {
    const order = {
      email: data.email,
      phone: data.phone,
      firstName: data.firstName,
      lastName: data.lastName,
      subtotal: selectedOrder.sumTotalPrice,
      shippingCost: Number(deliveryPrice),
      discount: discount,
      amount: orderTotal,
      address: {
        country: data.country,
        city: data.city,
        street: data.street,
        house: data.house,
        flat: data.flat,
        postalCode: data.postalCode,
      },
      orderItems: selectedOrder.items.map((item) => ({
        productId: item.productId,
        name: item.name,
        price: Number(item.price),
        oldPrice: Number(item.oldPrice),
        totalPrice: Number(item.totalPrice),
        totalOldPrice: Number(item.totalOldPrice),
        discount: item.discount,
        image: item.image,
        quantity: item.quantity,
        size: item.size,
        color: item.color,
      })),
    };
    console.log('order:', order);
    const request = await mutationPostOrder.mutateAsync(order);
    if (mutationPostOrder.isError) {
      toast.error('The order has not been sent,an error has occurred');
      return;
    }
    console.log('заказ:', request.confirmation.confirmation_url);
    route.push(request.confirmation.confirmation_url);
  };

  return (
    <section>
      <h1 className={styles.title}>Checkout</h1>
      <div className={styles.divider}></div>
      <div className={styles.container}>
        <div className={styles.left}>
          <div>
            <div className={styles.subtitle}>Item Review</div>
            {isLoadingAuth || (isAuth && !cartBase.sumTotalPrice) ? (
              <CheckoutSkeleton />
            ) : (
              <div className=" flex flex-col bg-neutral-100 rounded px-1 ">
                {cartBase.cart?.items.map((item) => {
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
                  {selectedOrder.items.length !== 0 &&
                    selectedOrder.sumTotalPrice}
                </div>
              </div>
            )}
          </div>
          <div className={`${styles.divider} md:hidden`}></div>
        </div>
        <div className={styles.right}>
          <div className={styles.subtitle}>Shipping Address</div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CheckoutForm form={form} delivery={delivery} />
              <OrderTotals
                discount={discount}
                subtotal={selectedOrder.sumTotalPrice}
                delivery={delivery}
                deliveryPrice={deliveryPrice}
                orderTotal={orderTotal}
              />
            </form>
          </Form>
        </div>
      </div>
    </section>
  );
};
