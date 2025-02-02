import { OrdersDataType } from '@/types/order_type';
import axios from 'axios';

export const getOrdersServise = async (query: string) => {
  const { data } = await axios.get<OrdersDataType>(`/api/order?query=${query}`);
  return data;
};
