import axios from 'axios';

export const postBrandServise = async (brandName: { name: string }) => {
  const { data } = await axios.post<{ message: string }>(
    '/api/brand',
    brandName
  );
  return data;
};
