import { getCartServise } from './servises/getCartServise';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { CommonCartType } from '@/types/cart_type';

export const useCarQuery = (
  cartId: string | undefined,
  enabled: boolean,
  options?: UseQueryOptions<CommonCartType>
) => {
  return useQuery({
    queryKey: ['cart'],
    queryFn: () => getCartServise(cartId),
    ...options,
    enabled: enabled,
  });
};
