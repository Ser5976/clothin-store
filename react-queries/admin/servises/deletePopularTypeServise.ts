import axios from 'axios';

export const deletePopularTypeServise = async (popularTypeId: string) => {
  const data = await axios.delete(`/api/popular/${popularTypeId}`);
  return data;
};
