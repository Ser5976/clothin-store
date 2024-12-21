import axios from 'axios';
import { ProductDataType } from '@/validators/product-validator';

export const postProductServise = async (product: ProductDataType) => {
  const { data } = await axios.post<{ message: string }>(
    '/api/product',
    product
  );
  return data;
};
