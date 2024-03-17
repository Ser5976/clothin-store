'use client';
import { cn } from '@/lib/utils';
import styles from './badge-favourites.module.css';
import { Heart, RotateCw } from 'lucide-react';
import { useFavouritesPost } from '@/react-queries/useFavouritesPost';
import { useSession } from 'next-auth/react';
import { useFavouritesStore } from '@/stores/useFavouritesStore';
import { HTMLAttributes, useEffect, useState } from 'react';
import { Button } from '../ui/button';
import { useStore } from 'zustand';

export const BadgeFavourites = ({
  productId,
  button = false,
  className,
}: {
  productId: string;
  button?: boolean;
  className?: HTMLAttributes<HTMLDivElement> | string;
}) => {
  //получаемм данные по авторизации
  const { status } = useSession();
  const isAuth = status === 'authenticated';
  //получаем данные из стора
  const { favouritesBase, favouritesStore, refetch, setFavouritesStore } =
    useStore(useFavouritesStore, (state) => state);

  // выбираем какой массив избранных использовать(из базы или из стора)
  // делаем это при помощи useEffect,чтобы избежать конфликта с сервером
  const [selectedFavourites, setSelectedFavourites] = useState<
    { productId: string }[]
  >([]);

  useEffect(() => {
    if (isAuth) {
      setSelectedFavourites(favouritesBase);
    } else {
      setSelectedFavourites(favouritesStore);
    }
  }, [isAuth, favouritesBase, favouritesStore]);

  //кастомный хук useMutation, изменяем данные favourites в базе
  const mutationFavourites = useFavouritesPost(refetch);

  //удаляем или добавляем в избранное, если пользователь авторизован работаем с базой,если нет- то со стором
  const handlerFavourites = (obj: { productId: string }) => {
    if (isAuth) {
      mutationFavourites.mutate(obj);
    } else {
      setFavouritesStore(obj);
    }
  };
  return button ? (
    <Button
      size="default"
      variant="outline"
      className={`${styles.button_favourites} ${className}`}
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
