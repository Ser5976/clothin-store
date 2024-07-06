import { ProductType } from './product_type';

export type ProductFilterType = {
  count: number;
  pageQty: number;
  product: ProductType[];
};
