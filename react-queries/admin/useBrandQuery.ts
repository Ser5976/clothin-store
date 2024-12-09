import { useQuery } from '@tanstack/react-query';
import { getBrandServise } from './servises/getBrandServise';

export const useBrandQuery = (query: string) => {
  return useQuery({
    queryKey: ['admin-brand-search', query],
    queryFn: () => getBrandServise(query),
  });
};
