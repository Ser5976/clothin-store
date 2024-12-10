import { GeneralMaterialType } from '../../../types/general-material_type';
import axios from 'axios';

export const getMaterialServise = async (query: string) => {
  const { data } = await axios.get<GeneralMaterialType>(
    `/api/material?query=${query}`
  );
  return data;
};
