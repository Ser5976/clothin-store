import axios from 'axios';

export const postCategoryServise = async (categoryName: { name: string }) => {
  const { data } = await axios.post<{ message: string }>(
    '/api/category',
    categoryName
  );
  return data;
};
