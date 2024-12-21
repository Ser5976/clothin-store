import { ProductDataType } from './../../../validators/product-validator';
import axios from 'axios';

export const updateProductServise = async (dataProduct: {
  id: string;
  product: ProductDataType;
}) => {
  const { data } = await axios.put<{ message: string }>(
    `/api/product/${dataProduct.id}`,
    dataProduct.product
  );
  return data;
};
