import { AdminTypeDataType } from '@/types/admin-type_type';
import axios from 'axios';

export const getTypeServise = async (query: string) => {
  const { data } = await axios.get<AdminTypeDataType>(
    `/api/type?query=${query}`
  );
  return data;
};
