import axios from 'axios';

export const deleteImageServise = async (imageId: string) => {
  const data = await axios.delete(`/api/image/${imageId}`);
  return data;
};
