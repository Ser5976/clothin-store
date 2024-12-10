import { useQuery } from '@tanstack/react-query';
import { getMaterialServise } from './servises/getMaterialServise';

export const useMaterialQuery = (query: string) => {
  return useQuery({
    queryKey: ['admin-material-search', query],
    queryFn: () => getMaterialServise(query),
  });
};
