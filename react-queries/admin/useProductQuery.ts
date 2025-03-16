import { getProductServise } from './servises/getProductServise';
import { useQuery } from '@tanstack/react-query';

export const useProductQuery = (productId: string) => {
  return useQuery({
    queryKey: ['admin-product', productId],
    queryFn: () => getProductServise(productId),
  });
};
