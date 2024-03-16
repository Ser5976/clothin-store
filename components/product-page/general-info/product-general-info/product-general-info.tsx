import { ProductType } from '@/types/product_type';
import { FC } from 'react';
import { ProductGallery } from './product-gallery/product-gallery';
import { ProductSidebar } from './product-sidebar/product-sidebar';

type ProductGeneralInfoProps = {
  product: ProductType;
};

export const ProductGeneralInfo: FC<ProductGeneralInfoProps> = ({
  product,
}) => {
  return (
    <div className=" sm:grid sm:grid-cols-5 sm:gap-[5%] ">
      <ProductGallery product={product} />
      <ProductSidebar product={product} />
    </div>
  );
};
