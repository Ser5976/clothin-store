import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { deleteFavouritesItemServise } from './servises/deleteFavouritesItemServise';

export const useFavoretesItemDelete = (refetch?: any) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteFavouritesItemServise,
    onSuccess: () => {
      //после успешной матации, по ключу, обновляем данные,классная штука ,
      //но как-то работает через раз , непредсказуемо
      // почему то работает нестабильно, не знаю
      // queryClient.invalidateQueries({ queryKey: ['estimation-product'] });
      // поэтому изваращаюсь с refetch
      refetch();
    },
    onError: () => {
      toast.error('Something went wrong');
    },
  });
};
