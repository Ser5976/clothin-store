import { useQuery } from '@tanstack/react-query';
import { getCustomersServise } from './servises/getCustomersServise';

export const useCustomersQuery = () => {
  return useQuery({
    queryKey: ['admin-customers'],
    queryFn: () => getCustomersServise(),
  });
};
