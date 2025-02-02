import { useQuery } from '@tanstack/react-query';
import { getOrderServise } from './servises/getOrderServise';

export const useOrderQuery = (orderId: string) => {
  return useQuery({
    queryKey: ['admin-order', orderId],
    queryFn: () => getOrderServise(orderId),
  });
};
