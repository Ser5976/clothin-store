import { GeneralBrandType } from './../../../types/general-brand_type';
import axios from 'axios';

export const getBrandServise = async (query: string) => {
  const { data } = await axios.get<GeneralBrandType>(
    `/api/brand?query=${query}`
  );
  return data;
};
