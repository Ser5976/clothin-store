import { useMutation, useQueryClient } from '@tanstack/react-query';
import { postReviewServise } from './servises/postReviewServise';

export const useReviewPost = (refetchEstimation: any, refetchReviews: any) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postReviewServise,
    onSuccess: () => {
      //после успешной матации, по ключу, обновляем данные,классная штука ,
      //но как-то работает через раз , непредсказуемо
      // почему то работает нестабильно, не знаю
      //queryClient.invalidateQueries({ queryKey: ['favourites'] });
      // поэтому изваращаюсь с refetch
      refetchEstimation();
      refetchReviews();
    },
  });
};
