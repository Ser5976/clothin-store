import { useQuery } from '@tanstack/react-query';
import { getSizeServise } from './servises/getSizeServise';

export const useSizeQuery = () => {
  return useQuery({
    queryKey: ['admin-size'],
    queryFn: () => getSizeServise(),
  });
};
