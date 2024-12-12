import axios from 'axios';

export const deleteSizeServise = async (sizeId: string) => {
  const data = await axios.delete(`/api/size/${sizeId}`);
  return data;
};
