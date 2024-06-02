import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { postReviewServise } from './servises/postReviewServise';

export const useReviewPost = (refetchEstimation: any, refetchReviews: any) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postReviewServise,
    onSuccess: () => {
      //после успешной матации, по ключу, обновляем данные,классная штука ,
      //но как-то работает через раз , непредсказуемо
      // почему то работает нестабильно, не знаю
      queryClient.invalidateQueries({ queryKey: ['rating-product'] });
      // поэтому изваращаюсь с refetch
      refetchEstimation();
      refetchReviews();
    },
    onError: () => {
      toast.error('Something went wrong');
    },
  });
};
