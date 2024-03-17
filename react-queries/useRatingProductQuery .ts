import { useQuery } from '@tanstack/react-query';
import { getRatingProductServise } from './servises/getRatingProductServise';

export const useRatingProductQuery = (productId: string) => {
  return useQuery({
    queryKey: ['rating-product', productId],
    queryFn: () => getRatingProductServise(productId),
  });
};
