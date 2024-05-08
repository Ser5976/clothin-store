'use client';
import { useCartPost } from '@/react-queries/useCartPost';
import { useCarQuery } from '@/react-queries/useCartQuery';
import { useCartStore } from '@/stores/useCartStore';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect } from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import styles from './toolbar.module.css';
import { CartItem } from './cart-item';
import { Button } from '@/components/ui/button';
import { CommonCartType } from '@/types/cart_type';
import { RotateCw, ShoppingCart } from 'lucide-react';

export const ToolbarCart = () => {
  //проверка авторизации
  const { data, status } = useSession();
  const isAuth = status === 'authenticated';
  const isLoadingAuth = status === 'loading';
  const userId = data?.user.id;
  //получение данных корзины из стора
  const {
    setCartBase,
    setRefetch,
    cartItems,
    cartBase,
    sumTotalOldPrice,
    sumTotalPrice,
    updateQuantityProduct,
    deleteProduct,
  } = useCartStore((state) => state);
  //делаем запрос в базу данных корзины, только когда мы авторизованы
  // кастомный хук useQuery
  const { refetch, isError, isLoading } = useCarQuery(userId, isAuth, {
    onSuccess(data) {
      // записываем данные в стор ,чтобы воспользоваться ими в другом компоненте
      setCartBase(data);
      //из-за нестабильной работы queryClient.invalidateQueries,изваращаюсь с refetch
      // чтобы повторно запустить запрос
      setRefetch(refetch);
    },
  });
  //кастомный хук useMutation, добавляет данные  в базу корзины
  //из-за нестабильной работы queryClient.invalidateQueries,изваращаюсь с refetch
  const mutationAddCart = useCartPost(refetch);
  //запись данных в корзину от неавторизованного пользователя в базу данных при авторизации
  useEffect(() => {
    // проверка если пользователь авторизован и в сторе есть данные, тогда записываем их в базу
    if (isAuth && cartItems.length > 0) {
      mutationAddCart.mutateAsync(cartItems);
      // и очищаем стор, очищаем нереактивным способом(без рендеренга)
      useCartStore.setState({
        cartItems: [],
        sumTotalOldPrice: 0,
        sumTotalPrice: 0,
      });
    }
    // если неавторизованный, то  очищают стор от данных из базы
    if (!isAuth) {
      useCartStore.setState({ cartBase: {} as CommonCartType });
    }
  }, [isAuth]);
  // выбор переменной для отображения количества товаров в корзине
  const numberCartItems = isAuth
    ? cartBase.cart
      ? cartBase.cart.items.length
      : 0
    : cartItems.length;
  //console.log('cart:', cartItems);
  // console.log('cartBase:', cartBase);

  //выбор места откуда берём массив товаров корзины(база или стор)
  const products = isAuth
    ? cartBase.cart
      ? cartBase.cart.items
      : []
    : cartItems;
  //конечно с условиями я здесь нагородил
  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className={styles.cart}>
          {/*   <Image
            src="/header/cart.svg"
            alt="cart"
            width={20.63}
            height={18.79}
          /> */}
          <ShoppingCart size="20" color="#424551" />
          <div className={styles.badge_cart}>
            {isAuth && isError ? (
              <span className="text-red-500 ">?</span>
            ) : isLoadingAuth || (isAuth && isLoading) ? (
              <RotateCw
                size={14}
                color="#fff"
                strokeWidth={1.5}
                absoluteStrokeWidth
                className="  animate-spin"
              />
            ) : (
              numberCartItems
            )}
          </div>
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className={styles.sheet_title}>
            <div>Your cart</div>
            {isAuth && isError ? (
              <span className="text-red-500 ">?</span>
            ) : isAuth && isLoading ? (
              <div className=" flex items-center">
                <RotateCw
                  size={16}
                  color="#808080"
                  strokeWidth={1}
                  absoluteStrokeWidth
                  className="  animate-spin"
                />
              </div>
            ) : (
              <div>({numberCartItems})</div>
            )}
          </SheetTitle>
        </SheetHeader>
        <div className="custom-scroll-cart">
          {isAuth && isError ? (
            <div className=" text-red-500 text-sm  flex  items-center py-4">
              <div> Data not received</div>
            </div>
          ) : isLoadingAuth || (isAuth && isLoading) ? (
            <div className="py-4">...Loading</div>
          ) : products?.length === 0 ? (
            <div className=" py-4">The basket is empty</div>
          ) : (
            <div className=" flex flex-col">
              {products.map((item) => {
                return (
                  <CartItem
                    item={item}
                    key={item.productId}
                    isAuth={isAuth}
                    refetch={refetch}
                    updateQuantityProduct={updateQuantityProduct}
                    deleteProduct={deleteProduct}
                  />
                );
              })}
            </div>
          )}
          {isAuth && isError
            ? null
            : products.length !== 0 && (
                <div className="p-4  border-t border-slate-200 my-10">
                  <div className="flex flex-col max-w-[300px] gap-4">
                    <div className="flex flex-row justify-between">
                      <div className="text-zinc-500 text-base">Subtotal:</div>
                      <div className="flex gap-1">
                        <div className="text-right text-red-500 text-xl font-bold">
                          ${isAuth ? cartBase.sumTotalPrice : sumTotalPrice}
                        </div>
                        <div className="text-right text-zinc-500 text-sm line-through">
                          {isAuth
                            ? cartBase.sumTotalOldPrice &&
                              cartBase.sumTotalOldPrice !==
                                cartBase.sumTotalPrice
                              ? `$${cartBase.sumTotalOldPrice}`
                              : null
                            : sumTotalOldPrice &&
                              sumTotalOldPrice !== sumTotalPrice
                            ? `$${sumTotalOldPrice}`
                            : null}
                        </div>
                      </div>
                    </div>

                    <SheetClose asChild>
                      <Button
                        size="lg"
                        className=" flex  gap-2 text-center text-white text-base font-bold  bg-cyan-800 hover:bg-cyan-900 "
                      >
                        <Image
                          src="/cart/card.svg"
                          alt="cart"
                          width={21.5}
                          height={18.5}
                        />
                        Checkout
                      </Button>
                    </SheetClose>
                  </div>
                </div>
              )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
