import { ColorType } from '../../../types/color_type';

import axios from 'axios';

export const getColorServise = async () => {
  const { data } = await axios.get<ColorType[]>('/api/color');
  return data;
};
