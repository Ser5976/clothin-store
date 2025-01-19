import { PopularTypesType } from '@/types/popular_types_type';
import axios from 'axios';

export const getPopularTypeServise = async () => {
  const { data } = await axios.get<PopularTypesType[]>('/api/popular');
  return data;
};
