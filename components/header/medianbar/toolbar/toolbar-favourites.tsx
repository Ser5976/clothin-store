import { useFavouritesPost } from '@/react-queries/useFavouritesPost';
import { useFavouritesQuery } from '@/react-queries/useFavouritesQuery';
import { useFavouritesStore } from '@/stores/useFavouritesStore';
import { TypeFavourites } from '@/types/type_favorites';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect } from 'react';
import styles from './toolbar.module.css';

export const ToolbarFavourites = () => {
  console.log('toolbarfavourites');
  //проверка авторизации
  const session = useSession();
  const { status } = useSession();
  const isAuth = status === 'authenticated';

  //получение данных favourites из стора
  const state = useFavouritesStore((state) => state);

  // кастомный хук useQuery получение даных по избранным товарам из базы данных и запись их в стор
  const { refetch } = useFavouritesQuery(isAuth, {
    select: (data: TypeFavourites[]) => {
      return data.map((obj) => {
        return { productId: obj.productId };
      });
    },
    onSuccess(data) {
      // записываем данные в стор ,чтобы воспользоваться ими в другом компоненте
      state.setFavouritesBase(data);
    },
  });
  //записываем refetch в стор,чтобы потом взять для bage-favourites
  useEffect(() => {
    state.setRefetch(refetch);
  }, []);
  //кастомный хук useMutation, изменяем данные favourites в базе
  //из-за нестабильной работы queryClient.invalidateQueries,изваращаюсь с refetch
  const mutationFavourites = useFavouritesPost(refetch);

  //запись данных по избранным продуктам от неавторизованного пользователя в базу данных при авторизации
  useEffect(() => {
    // проверка если пользователь авторизован и в сторе есть данные, тогда записываем их в базу
    // и очищаем стор
    if (isAuth && state.favouritesStore.length > 0) {
      -mutationFavourites.mutate({ productIdArray: state.favouritesStore });
      state.clearingFavoritesStore();
    }
  }, [isAuth]);
  // выбор переменной для отображения
  const numberFavorites = isAuth
    ? state.favouritesBase.length
    : state.favouritesStore.length;
  // console.log('tolbar-favorites render');
  return (
    <div className={styles.wishlist}>
      <Image src="/header/heart.svg" alt="heart" width={20} height={20} />
      <div className={styles.badge_heart}>{numberFavorites}</div>
    </div>
  );
};
