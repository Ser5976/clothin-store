import { TypeFavourites } from '@/types/type_favorites';
import axios from 'axios';

export const postFavouritesServise = async (
  obj: { productId: string } | { productIdArray: { productId: string }[] }
) => {
  const { data } = await axios.post<{ message: string }>(
    '/api/favourites',
    obj
  );
  return data;
};
