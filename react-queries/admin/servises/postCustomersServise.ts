import { CustomersDataType } from '../../../validators/customers-validator';

import axios from 'axios';

export const postCustomersServise = async (
  customersData: CustomersDataType
) => {
  const { data } = await axios.post<{ message: string }>(
    '/api/for-customers',
    customersData
  );
  return data;
};
