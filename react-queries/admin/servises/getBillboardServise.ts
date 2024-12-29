import { BillboardType } from '@/types/carousel_type';
import axios from 'axios';

export const getBillboardServise = async () => {
  const { data } = await axios.get<BillboardType[]>('/api/billboard');
  return data;
};
