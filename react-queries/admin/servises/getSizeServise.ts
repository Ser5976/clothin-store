import { SizeType } from './../../../types/size_type';

import axios from 'axios';

export const getSizeServise = async () => {
  const { data } = await axios.get<SizeType[]>('/api/size');
  return data;
};
