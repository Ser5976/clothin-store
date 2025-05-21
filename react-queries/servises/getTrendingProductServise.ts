import { ProductType } from '@/types/product_type';
import axios from 'axios';

export const getTrendingProductServise = async () => {
  const { data } = await axios.get<ProductType[]>(`/api/purchased-goods`);
  return data;
};
