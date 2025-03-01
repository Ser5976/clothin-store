import axios from 'axios';
import { CustomersType } from '@/types/customers_type';

export const getCustomerServise = async (customerId: string) => {
  const { data } = await axios.get<CustomersType>(
    `/api/for-customers/${customerId}`
  );
  return data;
};
