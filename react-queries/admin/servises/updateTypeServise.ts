import { TypeType } from '@/types/type_type';
import axios from 'axios';

export const updateTypeServise = async (type: TypeType) => {
  const { data } = await axios.put<{ message: string }>(
    `/api/type/${type.id}`,
    { name: type.name }
  );
  return data;
};
