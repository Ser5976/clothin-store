import { AdminProductDataType } from '@/types/admin-product_type';

import axios from 'axios';

export const getProductServise = async (query: string) => {
  const { data } = await axios.get<AdminProductDataType>(
    `/api/product?query=${query}`
  );
  return data;
};
