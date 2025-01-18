import { getCategoryServise } from './servises/getCategoryServise';
import { useQuery } from '@tanstack/react-query';

export const useCategoryQuery = () => {
  return useQuery({
    queryKey: ['admin-category'],
    queryFn: () => getCategoryServise(),
  });
};
