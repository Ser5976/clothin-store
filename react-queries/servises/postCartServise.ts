import { CartDataType } from '@/validators/cart-validator';
import axios from 'axios';

export const postCartServise = async (cartItems: CartDataType) => {
  const { data } = await axios.post('/api/cart', cartItems);
  return data;
};
