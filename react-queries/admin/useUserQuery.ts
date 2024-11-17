import { useQuery } from '@tanstack/react-query';
import { getUserServise } from './servises/getUserServise';

export const useUserQuery = (query: string) => {
  return useQuery({
    queryKey: ['user-search'],
    queryFn: () => getUserServise(query),
  });
};
