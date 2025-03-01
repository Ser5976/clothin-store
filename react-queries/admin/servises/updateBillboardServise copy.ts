import { CustomersDataType } from './../../../validators/customers-validator';
import axios from 'axios';

export const updateCustomersServise = async (customersData: {
  id: string;
  customers: CustomersDataType;
}) => {
  const { data } = await axios.put<{ message: string }>(
    `/api/for-customers/${customersData.id}`,
    customersData.customers
  );
  return data;
};
