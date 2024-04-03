import { ProductType } from '@/types/product_type';
import { FC } from 'react';
import { ProductCardMini } from '../product-card-mini/product-card-mini';
import { Detalis } from './detalis';

type ProductDetailsProps = {
  product: ProductType;
};

export const ProductDetails: FC<ProductDetailsProps> = ({ product }) => {
  return (
    <div className="grid grid-cols-4 max-md:grid-cols-3 ">
      <Detalis />
      <ProductCardMini product={product} />
    </div>
  );
};
