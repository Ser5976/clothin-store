import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { postFavouritesServise } from './servises/postFavouritesServise';

export const useFavouritesPost = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postFavouritesServise,
    onSettled: async () => {
      //после успешной матации, по ключу, обновляем данные,классная штука ,
      //но как-то работает через раз , непредсказуемо
      await queryClient.invalidateQueries(['favourites']);
    },
  });
};
