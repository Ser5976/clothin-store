import { ProductFilterType } from './../types/product_filter_type';
import { getProductFilterServise } from './servises/getProductFilterServise';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { ReadonlyURLSearchParams } from 'next/navigation';
import { ProductType } from '@/types/product_type';

export const useProductFilterQuery = (
  searchPrams: ReadonlyURLSearchParams,
  options?: UseQueryOptions<ProductFilterType>
) => {
  return useQuery({
    queryKey: ['product-filter'],
    queryFn: () => getProductFilterServise(searchPrams),
    ...options,
  });
};
