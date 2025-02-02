import { OrderType } from '@/types/order_type';
import axios from 'axios';

export const getOrderServise = async (orderId: string) => {
  const { data } = await axios.get<OrderType>(`/api/order/${orderId}`);
  return data;
};
