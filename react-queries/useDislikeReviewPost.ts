import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { postDislikeReviewServise } from './servises/postDislikeReviewServise';

export const useDislikeReviewPost = (refetchLike: any, refetchDislike: any) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postDislikeReviewServise,
    onSuccess: () => {
      //после успешной матации, по ключу, обновляем данные,классная штука ,
      //но как-то работает через раз , непредсказуемо
      // почему то работает нестабильно, не знаю
      //queryClient.invalidateQueries({ queryKey: ['dislike-review'] });
      // поэтому изваращаюсь с refetch
      refetchLike();
      refetchDislike();
    },
    onError: () => {
      toast.error('Something went wrong');
    },
  });
};
