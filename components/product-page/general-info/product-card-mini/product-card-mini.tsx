import { ProductType } from '@/types/product_type';
import { FC } from 'react';
import { FooterCard } from './footer-card';
import { HeaderCard } from './header-card';

type ProductCardMiniProps = {
  product: ProductType;
};

export const ProductCardMini: FC<ProductCardMiniProps> = ({ product }) => {
  return (
    <div className="col-span-1 ">
      <HeaderCard product={product} />
      <FooterCard product={product} />
    </div>
  );
};
