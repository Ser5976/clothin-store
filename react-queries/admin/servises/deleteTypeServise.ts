import axios from 'axios';

export const deleteTypeServise = async (typeId: string) => {
  const data = await axios.delete(`/api/type/${typeId}`);
  return data;
};
