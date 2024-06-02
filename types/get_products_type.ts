import { ProductType } from './product_type';

export type GetProductsType = {
  count: number;
  pageQty: number;
  product: ProductType[];
};
