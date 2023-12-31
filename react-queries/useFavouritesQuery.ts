import { getFavouritesServise } from './servises/getFavouritesServise';
import { TypeFavourites } from '../types/type_favorites';
import { useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useFavouritesQuery = (
  enabled: boolean,
  options?: UseQueryOptions<TypeFavourites[], Error, { productId: string }[]>
) => {
  return useQuery({
    queryKey: ['favourites'],
    queryFn: () => getFavouritesServise(),
    ...options,
    enabled: enabled,
    cacheTime: 0,
  });
};
