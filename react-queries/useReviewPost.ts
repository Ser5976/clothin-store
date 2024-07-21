import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { postReviewServise } from './servises/postReviewServise';

export const useReviewPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postReviewServise,
    onSuccess: () => {
      //после успешной матации, по ключу, обновляем данные,классная штука ,
      //но как-то работает через раз , непредсказуемо
      // почему то работает нестабильно, не знаю
      queryClient.invalidateQueries({
        queryKey: ['rating-product'],
      });
      queryClient.invalidateQueries({
        queryKey: ['reviews-product'],
      });
      queryClient.invalidateQueries({
        queryKey: ['estimation-product'],
      });
      // поэтому изваращаюсь с refetch
      // refetchEstimation();
      // refetchReviews();
    },
    onError: () => {
      toast.error('Something went wrong');
    },
  });
};
