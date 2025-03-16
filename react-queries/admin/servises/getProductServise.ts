import { ProductType } from '@/types/product_type';
import axios from 'axios';

export const getProductServise = async (productId: string) => {
  const { data } = await axios.get<ProductType>(`/api/product/${productId}`);
  return data;
};
