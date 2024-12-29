import { useQuery } from '@tanstack/react-query';
import { getBillboardServise } from './servises/getBillboardServise';

export const useBillboardQuery = () => {
  return useQuery({
    queryKey: ['admin-billboard'],
    queryFn: () => getBillboardServise(),
  });
};
