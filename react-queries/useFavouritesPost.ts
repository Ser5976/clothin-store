import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { postFavouritesServise } from './servises/postFavouritesServise';

export const useFavouritesPost = (refetch?: any) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postFavouritesServise,
    onSuccess: () => {
      //после успешной матации, по ключу, обновляем данные,классная штука ,
      //но как-то работает через раз , непредсказуемо
      // почему то работает нестабильно, не знаю
      //queryClient.invalidateQueries({ queryKey: ['favourites'] });
      // поэтому изваращаюсь с refetch
      refetch();
    },
    onError: () => {
      toast.error('Something went wrong');
    },
  });
};
