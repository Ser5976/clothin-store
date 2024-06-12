import { getSerchServise } from './servises/getSearchServise';
import { useQuery } from '@tanstack/react-query';

export const useSearchQuery = (query: string) => {
  return useQuery({
    queryKey: ['search'],
    queryFn: () => getSerchServise(query),
    enabled: false,
  });
};
