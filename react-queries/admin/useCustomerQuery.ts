import { useQuery } from '@tanstack/react-query';
import { getCustomerServise } from './servises/getCustomerServise';

export const useCustomerQuery = (customerId: string) => {
  return useQuery({
    queryKey: ['admin-customer', customerId],
    queryFn: () => getCustomerServise(customerId),
  });
};
