import { CategoryType } from './../../../types/category_type';
import axios from 'axios';

export const updateCategoryServise = async (category: CategoryType) => {
  const { data } = await axios.put<{ message: string }>(
    `/api/category/${category.id}`,
    { name: category.name }
  );
  return data;
};
