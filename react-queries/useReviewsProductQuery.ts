import { TypeReviews } from './../types/type_reviews';
import { getReviewsProductServise } from './servises/getReviewsProductServise';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useReviewsProductQuery = (
  productId: string,
  options?: UseQueryOptions<TypeReviews[], Error>
) => {
  return useQuery({
    queryKey: ['reviews-product', productId],
    queryFn: () => getReviewsProductServise(productId),
    ...options,
  });
};
