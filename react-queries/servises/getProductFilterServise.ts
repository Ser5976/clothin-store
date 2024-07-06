import { ProductFilterType } from './../../types/product_filter_type';
import axios from 'axios';
import { ReadonlyURLSearchParams } from 'next/navigation';

export const getProductFilterServise = async (
  searchPrams: ReadonlyURLSearchParams
) => {
  const { data } = await axios.get<ProductFilterType>(
    `/api/product-filter?${searchPrams}`
  );
  return data;
};
