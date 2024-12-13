import axios from 'axios';

export const deleteColorServise = async (colorId: string) => {
  const data = await axios.delete(`/api/color/${colorId}`);
  return data;
};
