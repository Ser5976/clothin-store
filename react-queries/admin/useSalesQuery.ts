import { getSalesServise } from './servises/getSalesServise';
import { useQuery } from '@tanstack/react-query';

export const useSalesQuery = () => {
  return useQuery({
    queryKey: ['admin-sales'],
    queryFn: () => getSalesServise(),
  });
};
