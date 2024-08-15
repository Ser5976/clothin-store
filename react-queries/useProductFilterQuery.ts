import { ProductFilterType } from './../types/product_filter_type';
import { getProductFilterServise } from './servises/getProductFilterServise';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { ReadonlyURLSearchParams } from 'next/navigation';

export const useProductFilterQuery = (
  searchPrams: ReadonlyURLSearchParams,
  enabled: boolean,
  options?: UseQueryOptions<ProductFilterType>
) => {
  return useQuery({
    queryKey: ['product-filter'],
    queryFn: () => getProductFilterServise(searchPrams),
    enabled: enabled,
    ...options,
  });
};
