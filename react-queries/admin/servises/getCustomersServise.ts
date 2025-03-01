import { CustomersType } from './../../../types/customers_type';

import axios from 'axios';

export const getCustomersServise = async () => {
  const { data } = await axios.get<CustomersType[]>(`/api/for-customers`);
  return data;
};
