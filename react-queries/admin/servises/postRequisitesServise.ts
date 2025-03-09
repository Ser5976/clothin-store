import { RequisitesDataType } from '@/validators/requisites-validator';
import axios from 'axios';

export const postRequisitesServise = async (requisites: RequisitesDataType) => {
  const { data } = await axios.post<{ message: string }>(
    '/api/requisites',
    requisites
  );
  return data;
};
