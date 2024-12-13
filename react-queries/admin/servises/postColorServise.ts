import axios from 'axios';

export const postColorServise = async (color: {
  name: string;
  value: string;
}) => {
  const { data } = await axios.post<{ message: string }>('/api/color', color);
  return data;
};
