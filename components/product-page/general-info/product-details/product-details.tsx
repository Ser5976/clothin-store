import { ProductType } from '@/types/product_type';
import { FC } from 'react';
import ProductCardMini from '../product-card-mini/product-card-mini';
import { Detalis } from './detalis';

type ProductDetailsProps = {
  product: ProductType;
};

export const ProductDetails: FC<ProductDetailsProps> = ({ product }) => {
  return (
    <div className="flex justify-between gap-[25px] ">
      <Detalis detalis={product.description} />
      <div className="w-[300px]  max-xl:max-w-[250px] max-lg:w-[200px] max-[822px]:hidden">
        <ProductCardMini product={product} />
      </div>
    </div>
  );
};
