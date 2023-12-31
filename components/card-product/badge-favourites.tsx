import { cn } from '@/lib/utils';
import { useFavouritesStore } from '@/stores/useFavouritesStore';
import styles from './card-product.module.css';
import { Heart } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useFavouritesQuery } from '@/react-queries/useFavouritesQuery';
import { TypeFavourites } from '@/types/type_favorites';
import { useFavouritesPost } from '@/react-queries/useFavouritesPost';

export const BadgeFavourites = ({ productId }: { productId: string }) => {
  // это костыль,который позволяет избежать конфликта с сервером(динамический роут не смог подключить, показывал ошибку)
  //из-за стора(useFavouritesStore,данные,которые на клиенте  не попадают на сервер и получатся конфликт)
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);
  //проверка авторизации
  const session = useSession();
  //получение данных favourites из стора
  const state = useFavouritesStore((state) => state);
  //console.log('favouritesStore:', state.favourites);
  //если мы авторизованы получаем данные из базы
  //это кастомный хук для useQuery,передаём опциональные(необязательные параметры)session.data-при помощи которой
  //будем блокировать или разрешать запрос(enabled в useQuery ) и select- при помощи которого
  //переформатируем полученные данные(сделаем структуру такой как в state.favourites )
  const { data: favouritesBase } = useFavouritesQuery(!!session.data, {
    select: (data: TypeFavourites[]) => {
      return data.map((obj) => {
        return { productId: obj.productId };
      });
    },
  });
  //кастомный хук useMutation, изменяем данные favourites в базе
  const mutationFavourites = useFavouritesPost();
  // выбираем какой массив избранных использовать(из базы или из стора)
  const selectedFavourites = favouritesBase ?? state?.favourites;
  //удаляем или добавляем в избранное
  const handlerFavourites = (obj: { productId: string }) => {
    if (session.data) {
      mutationFavourites.mutate(obj);
    } else {
      state.setFavourites(obj);
    }
  };
  // Это даёт не запускать компанент на сервере
  if (!isMounted) {
    return null;
  }
  return (
    <Heart
      color="#B0B0B0"
      className={cn({
        [styles.heart_active]: selectedFavourites?.some(
          (obj) => obj.productId === productId
        ),
      })}
      onClick={() => handlerFavourites({ productId })}
    />
  );
};
