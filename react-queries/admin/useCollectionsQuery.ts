import { useQuery } from '@tanstack/react-query';
import { getCollectionsServise } from './servises/getColectionsServise';

export const useCollectionsQuery = () => {
  return useQuery({
    queryKey: ['admin-collections'],
    queryFn: () => getCollectionsServise(),
  });
};
