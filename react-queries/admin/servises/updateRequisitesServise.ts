import { RequisitesDataType } from './../../../validators/requisites-validator';
import axios from 'axios';

interface RequisitesData {
  requisitesId: string;
  requisites: RequisitesDataType;
}

export const updateRequisitesServise = async (
  requisitesData: RequisitesData
) => {
  const { data } = await axios.put<{ message: string }>(
    `/api/requisites/${requisitesData.requisitesId}`,
    requisitesData.requisites
  );
  return data;
};
