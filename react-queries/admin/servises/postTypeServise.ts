import axios from 'axios';

export const postTypeServise = async (typeName: { name: string }) => {
  const { data } = await axios.post<{ message: string }>('/api/type', typeName);
  return data;
};
