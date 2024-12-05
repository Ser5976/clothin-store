import axios from 'axios';

export const deleteCategoryServise = async (categoryId: string) => {
  const data = await axios.delete(`/api/category/${categoryId}`);
  return data;
};
