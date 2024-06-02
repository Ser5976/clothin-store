import { getLikeReviewServise } from './servises/getLikeReviewServise';
import { useQuery } from '@tanstack/react-query';

export const useLikeReviewQurety = (reviewId: string) => {
  return useQuery({
    queryKey: ['like-review', reviewId],
    queryFn: () => getLikeReviewServise(reviewId),
  });
};
