import { useQuery } from '@tanstack/react-query';
import { getTrendingProductServise } from './servises/getTrendingProductServise';

export const useTrendingProductQuery = () => {
  return useQuery({
    queryKey: ['trending-product'],
    queryFn: () => getTrendingProductServise(),
  });
};
