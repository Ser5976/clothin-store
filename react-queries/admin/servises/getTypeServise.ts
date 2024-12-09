import { GeneralTypeType } from './../../../types/general-type_type';

import axios from 'axios';

export const getTypeServise = async (query: string) => {
  const { data } = await axios.get<GeneralTypeType>(`/api/type?query=${query}`);
  return data;
};
