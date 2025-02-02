import { getOrdersServise } from './servises/getOrdersServise';
import { useQuery } from '@tanstack/react-query';

export const useOrdersQuery = (query: string) => {
  return useQuery({
    queryKey: ['admin-order-search', query],
    queryFn: () => getOrdersServise(query),
  });
};
