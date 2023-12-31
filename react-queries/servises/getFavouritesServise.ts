import { TypeFavourites } from '@/types/type_favorites';
import axios from 'axios';

export const getFavouritesServise = async () => {
  const { data } = await axios.get<TypeFavourites[]>('/api/favourites');
  return data;
};
