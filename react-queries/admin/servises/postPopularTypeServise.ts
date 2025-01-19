import { PopularTypesDataType } from '@/validators/popular-types-validator';
import axios from 'axios';

export const postPopularTypeServise = async (
  populatTypeData: PopularTypesDataType
) => {
  const { data } = await axios.post<{ message: string }>(
    '/api/popular',
    populatTypeData
  );
  return data;
};
