import { useQuery } from '@tanstack/react-query';
import { getEstimationProductServise } from './servises/getEstimationProductServise';
export const useEstimationProductQuery = (productId: string) => {
  return useQuery({
    queryKey: ['estimation-product', productId],
    queryFn: () => getEstimationProductServise(productId),
  });
};
