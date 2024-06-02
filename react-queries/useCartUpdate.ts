import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { updateCartServise } from './servises/updateCartServise';

export const useCartUpdate = (refetch?: any) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCartServise,
    onSuccess: () => {
      //после успешной матации, по ключу, обновляем данные,классная штука ,
      //но как-то работает через раз , непредсказуемо
      // почему то работает нестабильно, не знаю
      //queryClient.invalidateQueries({ queryKey: ['cart'] });
      // поэтому изваращаюсь с refetch
      refetch();
    },
    onError: () => {
      toast.error('Something went wrong');
    },
  });
};
