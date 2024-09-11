import { useQuery } from '@tanstack/react-query';
import { ReadonlyURLSearchParams } from 'next/navigation';
import { getStoreReviewServise } from './servises/getStoreReviewServise';

export const useStoreReviewQuery = (
  searchPrams: ReadonlyURLSearchParams
  // enabled: boolean
) => {
  return useQuery({
    queryKey: ['store-review'],
    queryFn: () => getStoreReviewServise(searchPrams),
    //  enabled: enabled,
  });
};
