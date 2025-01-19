import axios from 'axios';
import { PopularTypesDataType } from '@/validators/popular-types-validator';

export const updatePopularTypeServise = async (popularTypeData: {
  id: string;
  popularType: PopularTypesDataType;
}) => {
  const { data } = await axios.put<{ message: string }>(
    `/api/popular/${popularTypeData.id}`,
    popularTypeData.popularType
  );
  return data;
};
