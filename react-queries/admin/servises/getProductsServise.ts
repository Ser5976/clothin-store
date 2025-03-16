import { GeneralProductDataType } from '@/types/general-product_type';

import axios from 'axios';

export const getProductsServise = async (query: string) => {
  const { data } = await axios.get<GeneralProductDataType>(
    `/api/product?query=${query}`
  );
  return data;
};
