import { postStoreReviewServise } from './servises/postStoreReviewServise';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useStoreReviewPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postStoreReviewServise,
    onSuccess: () => {
      //после успешной матации, по ключу, обновляем данные,классная штука ,
      //но как-то работает через раз , непредсказуемо
      // почему то работает нестабильно, не знаю
      queryClient.invalidateQueries({
        queryKey: ['store-review'],
      });
      toast.success('Your review has been saved');

      // поэтому изваращаюсь с refetch
      // refetchEstimation();
      // refetchReviews();
    },
    onError: () => {
      toast.error('Something went wrong');
    },
  });
};
