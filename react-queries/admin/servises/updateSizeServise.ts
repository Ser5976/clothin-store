import { SizeType } from './../../../types/size_type';
import axios from 'axios';

export const updateSizeServise = async (size: SizeType) => {
  const { data } = await axios.put<{ message: string }>(
    `/api/size/${size.id}`,
    { value: size.value }
  );
  return data;
};
