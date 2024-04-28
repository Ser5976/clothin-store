import { useFavouritesPost } from '@/react-queries/useFavouritesPost';
import { useFavouritesQuery } from '@/react-queries/useFavouritesQuery';
import { useFavouritesStore } from '@/stores/useFavouritesStore';
import { TypeFavourites } from '@/types/type_favorites';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useEffect } from 'react';
import { useStore } from 'zustand';
import styles from './toolbar.module.css';

export const ToolbarFavourites = () => {
  // console.log('toolbarfavourites');
  //проверка авторизации
  const { status } = useSession();
  const isAuth = status === 'authenticated';

  //получение данных favourites из стора(приемер useStore из zustand для избежания конфликта с сервером,
  //только что-то он не помог  в BadgeFavourites)
  const state = useStore(useFavouritesStore, (state) => state);

  // кастомный хук useQuery получение даных по избранным товарам из базы данных и запись их в стор
  //если мы авторизованы получаем данные из базы, если нет берём из стора
  //в кастомный хук для useQuery,передаём опциональные(необязательные параметры)isAuth-при помощи которой
  //будем блокировать или разрешать запрос(enabled в useQuery ) и select- при помощи которого
  //переформатируем полученные данные(сделаем структуру такой как в state.favourites )
  const { refetch } = useFavouritesQuery(isAuth, {
    select: (data: TypeFavourites[]) => {
      return data.map((obj) => {
        return { productId: obj.productId };
      });
    },
    onSuccess(data) {
      // записываем данные в стор ,чтобы воспользоваться ими в другом компоненте
      state.setFavouritesBase(data);
      //записываем refetch в стор,чтобы потом взять для bage-favourites
      state.setRefetch(refetch);
    },
  });

  //кастомный хук useMutation, изменяем данные favourites в базе
  //из-за нестабильной работы queryClient.invalidateQueries,изваращаюсь с refetch
  const mutationFavourites = useFavouritesPost(refetch);

  //запись данных по избранным продуктам от неавторизованного пользователя в базу данных при авторизации
  useEffect(() => {
    // проверка если пользователь авторизован и в сторе есть данные, тогда записываем их в базу

    if (isAuth && state.favouritesStore.length > 0) {
      mutationFavourites.mutate({ productIdArray: state.favouritesStore });
      // и очищаем стор, очищаем не реактивным способом(без рендеренга)
      useFavouritesStore.setState({ favouritesStore: [] });
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
