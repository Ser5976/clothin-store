import { ProductType } from '@/types/product_type';
import { FC, memo } from 'react';
import { FooterCard } from './footer-card';
import { HeaderCard } from './header-card';

type ProductCardMiniProps = {
  product: ProductType;
};

const ProductCardMini: FC<ProductCardMiniProps> = ({ product }) => {
  return (
    <div className="">
      <HeaderCard product={product} />
      <FooterCard product={product} />
    </div>
  );
};
export default memo(ProductCardMini);
