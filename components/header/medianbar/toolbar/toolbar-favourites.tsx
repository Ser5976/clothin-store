'use client';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useFavouritesPost } from '@/react-queries/useFavouritesPost';
import { useFavouritesQuery } from '@/react-queries/useFavouritesQuery';
import { useFavouritesStore } from '@/stores/useFavouritesStore';
import { TypeFavourites } from '@/types/type_favorites';
import { Heart, RotateCw } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useStore } from 'zustand';
import { FavoritesItem } from './favorites-item';
import styles from './toolbar.module.css';

export const ToolbarFavourites = () => {
  // console.log('toolbar-favourites');
  //проверка авторизации
  const { status } = useSession();
  const isAuth = status === 'authenticated';
  const isLoadingAuth = status === 'loading';

  //получение данных favourites из стора(приемер useStore из zustand для избежания конфликта с сервером,
  //только что-то он не помог  в BadgeFavourites)
  const state = useStore(useFavouritesStore, (state) => state);

  // кастомный хук useQuery получение даных по избранным товарам из базы данных и запись их в стор
  //если мы авторизованы получаем данные из базы, если нет берём из стора
  //в кастомный хук для useQuery,передаём опциональные параметры isAuth-при помощи которой
  //будем блокировать или разрешать запрос(enabled в useQuery ) и select- при помощи которого
  //переформатируем полученные данные(сделаем структуру такой как в state.favourites ) и onSuccess
  const { refetch, isLoading, isError } = useFavouritesQuery(isAuth, {
    select: (data: TypeFavourites[]) => {
      return data.map((item) => {
        return {
          productId: item.productId,
          name: item.product.name,
          price: item.product.price,
          oldPrice: item.product.oldPrice,
          image: item.product.image[0].url,
        };
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
      mutationFavourites.mutate({
        productIdArray: state.favouritesStore.map((item) => ({
          productId: item.productId,
        })),
      });
      // и очищаем стор, очищаем нереактивным способом(без рендеренга)
      useFavouritesStore.setState({ favouritesStore: [] });
    }
    // если неавторизованный, то  очищают стор от данных из базы
    if (!isAuth) {
      useFavouritesStore.setState({ favouritesBase: [] });
    }
  }, [isAuth]);
  // выбор переменной для отображения
  const numberFavorites = isAuth
    ? state.favouritesBase.length
    : state.favouritesStore.length;
  //выбор места откуда берём массив избранных товаров (база или стор)
  const favouritesProducts = isAuth
    ? state.favouritesBase
    : state.favouritesStore;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <div className={styles.wishlist}>
          <Heart size="20" color="#424551" />

          {isAuth && isError ? (
            <span className=" text-[20px]   text-red-500 absolute top-[-6px] left-[27px]">
              ?
            </span>
          ) : isLoadingAuth || (isAuth && isLoading) ? (
            <RotateCw
              size={16}
              color="#424551"
              strokeWidth={1.5}
              absoluteStrokeWidth
              className=" absolute top-[1px] left-[22px]  animate-spin"
            />
          ) : (
            <div className={styles.badge_heart}>{numberFavorites}</div>
          )}
        </div>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className={styles.sheet_title}>
            <div>Your favorites products</div>
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
              <div>({numberFavorites})</div>
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
          ) : favouritesProducts?.length === 0 ? (
            <div className=" py-4">The basket is empty</div>
          ) : (
            <div className=" flex flex-col">
              {favouritesProducts.map((item) => {
                return (
                  <FavoritesItem
                    key={item.productId}
                    item={item}
                    isAuth={isAuth}
                    deleteFavouritesItem={state.deleteFavouritesItem}
                    refetch={refetch}
                  />
                );
              })}
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
