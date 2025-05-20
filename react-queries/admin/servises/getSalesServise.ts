import { SalesDataType } from '@/types/sales_type';
import axios from 'axios';

export const getSalesServise = async () => {
  const { data } = await axios.get<SalesDataType[]>(`/api/get-sales`);
  return data;
};
