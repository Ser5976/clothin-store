import { postLikeReviewServise } from './servises/postLikeReviewServise';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useLikeReviewPost = (refetchLike: any, refetchDislike: any) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postLikeReviewServise,
    onSuccess: () => {
      //после успешной мутации, по ключу, обновляем данные,классная штука ,
      //но как-то работает через раз , непредсказуемо
      // почему то работает нестабильно, не знаю
      //queryClient.invalidateQueries({ queryKey: ['like-review'] });
      // поэтому изваращаюсь с refetch
      refetchLike();
      refetchDislike();
    },
    onError: () => {
      toast.error('Something went wrong');
    },
  });
};
