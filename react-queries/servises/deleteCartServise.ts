import axios from 'axios';

export const deleteCartServise = async (cartItemId: string | undefined) => {
  await axios.delete(`/api/cart/${cartItemId}`);
};
