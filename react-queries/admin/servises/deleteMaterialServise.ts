import axios from 'axios';

export const deleteMaterialServise = async (materialId: string) => {
  const data = await axios.delete(`/api/material/${materialId}`);
  return data;
};
