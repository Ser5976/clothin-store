import axios from 'axios';

export const deleteBillboardServise = async (billboardId: string) => {
  const data = await axios.delete(`/api/billboard/${billboardId}`);
  return data;
};
