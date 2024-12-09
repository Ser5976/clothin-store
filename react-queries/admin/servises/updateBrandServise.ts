import { BrandType } from '@/types/brand_type';
import axios from 'axios';

export const updateBrandServise = async (brand: BrandType) => {
  const { data } = await axios.put<{ message: string }>(
    `/api/brand/${brand.id}`,
    { name: brand.name }
  );
  return data;
};
