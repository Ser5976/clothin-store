import {
  getReviewsProductServise,
  SortType,
} from './servises/getReviewsProductServise';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useReviewsProductQuery = (productId: string, sort: SortType) => {
  return useQuery({
    queryKey: ['reviews-product', productId, sort],
    queryFn: () => getReviewsProductServise(productId, sort),
  });
};
