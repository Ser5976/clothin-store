import axios from 'axios';

export const deleteFavouritesItemServise = async (productId: string) => {
  await axios.delete(`/api/favourites/${productId}`);
};
