import { cn } from '@/lib/utils';
import styles from './card-product.module.css';
import { Heart, RotateCw } from 'lucide-react';
import { useFavouritesPost } from '@/react-queries/useFavouritesPost';
import { useSession } from 'next-auth/react';
import { useFavouritesStore } from '@/stores/useFavouritesStore';
import { useEffect, useState } from 'react';

export const BadgeFavourites = ({ productId }: { productId: string }) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  //получаемм данные по авторизации
  const { status } = useSession();
  const isAuth = status === 'authenticated';
  //получаем данные из стора
  const state = useFavouritesStore();
  //если мы авторизованы получаем данные из базы
  //это кастомный хук для useQuery,передаём опциональные(необязательные параметры)isAuth-при помощи которой
  //будем блокировать или разрешать запрос(enabled в useQuery ) и select- при помощи которого
  //переформатируем полученные данные(сделаем структуру такой как в state.favourites )

  //кастомный хук useMutation, изменяем данные favourites в базе
  const mutationFavourites = useFavouritesPost(state.refetch);
  // выбираем какой массив избранных использовать(из базы или из стора)
  const selectedFavourites = isAuth
    ? state.favouritesBase
    : state.favouritesStore;
  //удаляем или добавляем в избранное
  const handlerFavourites = (obj: { productId: string }) => {
    if (isAuth) {
      mutationFavourites.mutate(obj);
    } else {
      state.setFavouritesStore(obj);
    }
  };
  if (!isMounted) {
    return null;
  }
  return (
    <>
      {mutationFavourites.isLoading ? (
        <RotateCw
          size={20}
          color="#808080"
          strokeWidth={1.5}
          absoluteStrokeWidth
          className="  animate-spin"
        />
      ) : (
        <Heart
          color="#B0B0B0"
          className={cn({
            [styles.heart_active]: selectedFavourites?.some(
              (obj) => obj.productId === productId
            ),
          })}
          onClick={() => handlerFavourites({ productId })}
        />
      )}
    </>
  );
};
