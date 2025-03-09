import { RequisitesType } from './../../../types/requisites_type';
import axios from 'axios';

export const getRequisitesServise = async () => {
  const { data } = await axios.get<RequisitesType[]>(`/api/requisites`);
  return data;
};
