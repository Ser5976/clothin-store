import axios from 'axios';
import { DeliveryDataType } from '@/validators/delivery-validator';

export const updateDeliveryServise = async (dataDelivery: {
  id: string;
  delivery: DeliveryDataType;
}) => {
  const { data } = await axios.put<{ message: string }>(
    `/api/delivery/${dataDelivery.id}`,
    dataDelivery.delivery
  );
  return data;
};
