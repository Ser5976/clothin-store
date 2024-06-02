import { getDislikeReviewServise } from './servises/getDislikeReviewServise';
import { useQuery } from '@tanstack/react-query';

export const useDislikeReviewQurety = (reviewId: string) => {
  return useQuery({
    queryKey: ['dislike-review', reviewId],
    queryFn: () => getDislikeReviewServise(reviewId),
  });
};
