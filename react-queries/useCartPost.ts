import { postCartServise } from './servises/postCartServise';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCartPost = (refetch?: any) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postCartServise,
    onSuccess: () => {
      //после успешной матации, по ключу, обновляем данные,классная штука ,
      //но как-то работает через раз , непредсказуемо
      // почему то работает нестабильно, не знаю
      //queryClient.invalidateQueries({ queryKey: ['favourites'] });
      // поэтому изваращаюсь с refetch
      refetch();
    },
  });
};
