import { useQuery } from '@tanstack/react-query';
import { getPopularTypeServise } from './servises/getPopularTypeServise';

export const usePopularTypeQuery = () => {
  return useQuery({
    queryKey: ['admin-popular-type'],
    queryFn: () => getPopularTypeServise(),
  });
};
