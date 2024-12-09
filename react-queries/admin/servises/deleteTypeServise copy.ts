import axios from 'axios';

export const deleteBrandServise = async (brandId: string) => {
  const data = await axios.delete(`/api/brand/${brandId}`);
  return data;
};
