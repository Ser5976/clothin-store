import { CommonEstimationType } from './../../types/estimation_type';

import axios from 'axios';

export const getEstimationProductServise = async (productId: string) => {
  const { data } = await axios.get<CommonEstimationType>(
    `/api/estimations/${productId}`
  );
  return data;
};
