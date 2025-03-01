import axios from 'axios';

export const deleteCustomerServise = async (customerId: string) => {
  const data = await axios.delete(`/api/for-customers/${customerId}`);
  return data;
};
