import { CategoryType } from './../../../types/category_type';
import axios from 'axios';

export const getCategoryServise = async () => {
  const { data } = await axios.get<CategoryType[]>('/api/category');
  return data;
};
