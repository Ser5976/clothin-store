import { useQuery } from '@tanstack/react-query';
import { getProductsServise } from './servises/getProductsServise';

export const useProductsQuery = (query: string) => {
  return useQuery({
    queryKey: ['admin-product-search', query],
    queryFn: () => getProductsServise(query),
  });
};
