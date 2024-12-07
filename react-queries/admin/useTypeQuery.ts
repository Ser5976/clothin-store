import { getTypeServise } from './servises/getTypeServise';
import { useQuery } from '@tanstack/react-query';

export const useTypeQuery = (query: string) => {
  return useQuery({
    queryKey: ['admin-type-search', query],
    queryFn: () => getTypeServise(query),
  });
};
