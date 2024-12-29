import axios from 'axios';
import { BillboardDataType } from '@/validators/billboard-validator ';

export const updateBillboardServise = async (billboardData: {
  id: string;
  billboard: BillboardDataType;
}) => {
  const { data } = await axios.put<{ message: string }>(
    `/api/billboard/${billboardData.id}`,
    billboardData.billboard
  );
  return data;
};
