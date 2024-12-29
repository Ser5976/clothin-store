import { BillboardDataType } from '@/validators/billboard-validator ';
import axios from 'axios';

export const postBillboardServise = async (
  billboardData: BillboardDataType
) => {
  const { data } = await axios.post<{ message: string }>(
    '/api/billboard',
    billboardData
  );
  return data;
};
