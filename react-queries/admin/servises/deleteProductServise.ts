import axios from 'axios';

export const deleteProductServise = async (productId: string) => {
  await axios.delete(`/api/product/${productId}`);
};
