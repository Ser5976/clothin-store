import { cn } from '@/lib/utils';
import styles from './card-product.module.css';
import { Heart, RotateCw } from 'lucide-react';
import { useFavouritesPost } from '@/react-queries/useFavouritesPost';
import { useSession } from 'next-auth/react';
import { useFavouritesStore } from '@/stores/useFavouritesStore';
import { useStore } from 'zustand';

export const BadgeFavourites = ({ productId }: { productId: string }) => {
  //получаемм данные по авторизации
  const { status } = useSession();
  const isAuth = status === 'authenticated';
  //получаем данные из стора
  const state = useStore(useFavouritesStore, (state) => state);
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
