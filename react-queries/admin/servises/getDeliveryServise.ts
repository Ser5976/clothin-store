import { DeliveryType } from '@/types/delivery_type';

import axios from 'axios';

export const getDeliveryServise = async () => {
  const { data } = await axios.get<DeliveryType[]>('/api/delivery');
  return data;
};
