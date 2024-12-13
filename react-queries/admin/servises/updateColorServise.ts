import { ColorType } from '../../../types/color_type';
import axios from 'axios';

export const updateColorServise = async (color: ColorType) => {
  const { data } = await axios.put<{ message: string }>(
    `/api/color/${color.id}`,
    { value: color.value, name: color.name }
  );
  return data;
};
