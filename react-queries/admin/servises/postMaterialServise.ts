import axios from 'axios';

export const postMaterialServise = async (materialName: { name: string }) => {
  const { data } = await axios.post<{ message: string }>(
    '/api/material',
    materialName
  );
  return data;
};
