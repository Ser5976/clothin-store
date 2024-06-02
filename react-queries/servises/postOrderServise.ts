import { OrderDataType } from '@/validators/order-validator';
import axios from 'axios';

export const postOrderServise = async (order: OrderDataType) => {
  const { data } = await axios.post('/api/order', order);
  return data;
};
