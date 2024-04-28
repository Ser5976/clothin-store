import { useCartPost } from '@/react-queries/useCartPost';
import { useCarQuery } from '@/react-queries/useCartQuery';
import { useCartStore } from '@/stores/useCartStore';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import styles from './toolbar.module.css';

export const ToolbarCart = () => {
  //проверка авторизации
  const { data, status } = useSession();
  const isAuth = status === 'authenticated';
  const userId = data?.user.id;
  const router = useRouter();
  //получение данных favourites из стора
  const { setCartBase, setRefetch, cartItems, cartBase } = useCartStore(
    (state) => state
  );
  // переход на страницу корзины(взависимости от аторизованности)
  const openCart = () => {
    data ? router.push(`/cart/${userId}`) : router.push('/cart/local');
  };
  //делаем запрос в базу данных корзины, только когда мы авторизованы
  const { refetch } = useCarQuery(userId, isAuth, {
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
  //запись данных корзину от неавторизованного пользователя в базу данных при авторизации
  useEffect(() => {
    // проверка если пользователь авторизован и в сторе есть данные, тогда записываем их в базу

    if (isAuth && cartItems.length > 0) {
      mutationAddCart.mutate(cartItems);
      // и очищаем стор, очищаем не реактивным способом(без рендеренга)
      useCartStore.setState({
        cartItems: [],
        sumTotalOldPrice: 0,
        sumTotalPrice: 0,
      });
    }
  }, [isAuth]);
  // выбор переменной для отображения
  const numberCartItems = isAuth
    ? cartBase.cart?.items.length
      ? cartBase.cart?.items.length
      : 0
    : cartItems.length;
  console.log('cart:', cartItems);
  console.log('cartBase:', cartBase);

  return (
    <div className={styles.cart} onClick={openCart}>
      <Image src="/header/cart.svg" alt="cart" width={20.63} height={18.79} />
      <div className={styles.badge_cart}>{numberCartItems}</div>
    </div>
  );
};
