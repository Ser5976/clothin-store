import { MaterialType } from './../../../types/material_type';
import axios from 'axios';

export const updateMaterialServise = async (material: MaterialType) => {
  const { data } = await axios.put<{ message: string }>(
    `/api/material/${material.id}`,
    { name: material.name }
  );
  return data;
};
