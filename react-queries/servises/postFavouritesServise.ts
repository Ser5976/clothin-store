import axios from 'axios';

export const postFavouritesServise = async (
  obj: { productId: string } | { productIdArray: { productId: string }[] }
) => {
  const { data } = await axios.post('/api/favourites', obj);
  return data;
};
