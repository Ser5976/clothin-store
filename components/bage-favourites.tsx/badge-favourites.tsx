'use client';
import { cn } from '@/lib/utils';
import styles from './badge-favourites.module.css';
import { Heart, RotateCw } from 'lucide-react';
import { useFavouritesPost } from '@/react-queries/useFavouritesPost';
import { useSession } from 'next-auth/react';
import { useFavouritesStore } from '@/stores/useFavouritesStore';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';

export const BadgeFavourites = ({
  productId,
  button = false,
}: {
  productId: string;
  button?: boolean;
}) => {
  //это кастыль, чтобы предотвратить конфликт с сервером
  // компонет рендериться на сревере и на клиенте
  // на сервере у компонента не будет данных из стора, поэтому конфликт
  // при помощи этого кастыля мы не рендерим компонент на сервере
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  //получаемм данные по авторизации
  const { status } = useSession();
  const isAuth = status === 'authenticated';
  //получаем данные из стора
  const state = useFavouritesStore((state) => state);
  //кастомный хук useMutation, изменяем данные favourites в базе
  const mutationFavourites = useFavouritesPost(state.refetch);
  // выбираем какой массив избранных использовать(из базы или из стора)
  const selectedFavourites = isAuth
    ? state.favouritesBase
    : state.favouritesStore;
  //удаляем или добавляем в избранное, если пользователь авторизован работаем с базой,если нет- то со стором
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
  return button ? (
    <Button
      size="default"
      variant="outline"
      className={styles.button_favourites}
      onClick={() => handlerFavourites({ productId })}
    >
      {mutationFavourites.isLoading ? (
        <RotateCw
          size={24}
          color="#808080"
          strokeWidth={1.5}
          absoluteStrokeWidth
          className="  animate-spin"
        />
      ) : (
        <Heart
          color="#17696A"
          className={cn({
            [styles.heart_active]: selectedFavourites?.some(
              (obj) => obj.productId === productId
            ),
          })}
        />
      )}
      <div className={styles.button_favourites_text}>Favourite</div>
    </Button>
  ) : (
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
          color="#17696A"
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
