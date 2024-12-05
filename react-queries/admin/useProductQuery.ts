import { useQuery } from '@tanstack/react-query';
import { getProductServise } from './servises/getProductServise';

export const useProductQuery = (query: string) => {
  return useQuery({
    queryKey: ['admin-product-search', query],
    queryFn: () => getProductServise(query),
  });
};
