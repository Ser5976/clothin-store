import axios from 'axios';

export const deleteDeliveryServise = async (deliveryId: string) => {
  const data = await axios.delete(`/api/delivery/${deliveryId}`);
  return data;
};
