import { DeliveryDataType } from '@/validators/delivery-validator';
import axios from 'axios';

export const postDeliveryServise = async (delivery: DeliveryDataType) => {
  const { data } = await axios.post<{ message: string }>(
    '/api/delivery',
    delivery
  );
  return data;
};
