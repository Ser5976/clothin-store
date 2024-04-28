import { CommonCartType } from './../../types/cart_type';
import axios from 'axios';

export const getCartServise = async (userId: string | undefined) => {
  const { data } = await axios.get<CommonCartType>(`/api/cart/${userId}`);
  return data;
};
