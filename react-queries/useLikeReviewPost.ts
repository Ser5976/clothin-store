import { postLikeReviewServise } from './servises/postLikeReviewServise';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useLikeReviewPost = (refetchLike: any, refetchDislike: any) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postLikeReviewServise,
    onSuccess: () => {
      //после успешной мутации, по ключу, обновляем данные,классная штука ,
      //но как-то работает через раз , непредсказуемо
      // почему то работает нестабильно, не знаю
      //queryClient.invalidateQueries({ queryKey: ['favourites'] });
      // поэтому изваращаюсь с refetch
      refetchLike();
      refetchDislike();
    },
  });
};
