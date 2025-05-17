import { useQuery } from '@tanstack/react-query';
import { getDeliveryServise } from './servises/getDeliveryServise';

export const useDeliveryrQuery = () => {
  return useQuery({
    queryKey: ['admin-delivery'],
    queryFn: () => getDeliveryServise(),
  });
};
