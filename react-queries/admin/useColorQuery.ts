import { useQuery } from '@tanstack/react-query';
import { getColorServise } from './servises/getColorServise';

export const useColorQuery = () => {
  return useQuery({
    queryKey: ['admin-color'],
    queryFn: () => getColorServise(),
  });
};
