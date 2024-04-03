'use client';
import { BadgeFavourites } from '@/components/bage-favourites.tsx/badge-favourites';
import SelectSize from '@/components/product-page/select-size/select-size';
import { Button } from '@/components/ui/button';
import { DeliveryType } from '@/types/delivery_type';
import { ProductType } from '@/types/product_type';
import Image from 'next/image';
import { FC, useState } from 'react';
import ProductColor from '../../product-color/product-color';
import { DeliveryTable } from './delivery-table';
import PriceRating from './price-rating';
import styles from './product-sidebar.module.css';
import { QuantityProduct } from './quantity_product';

type ProductSidebarProps = {
  product: ProductType;
  delivery: DeliveryType[];
};
export const ProductSidebar: FC<ProductSidebarProps> = ({
  product,
  delivery,
}) => {
  //цвет товара,понадобиться при формировани объекта продукта, для корзины и для активного стиля выбранного цвета
  const [colorName, setColorName] = useState(() =>
    product.colors.length === 1 ? product.colors[0].color.name : ''
  );
  //размер товара,понадобиться при формировани объекта продукта, для корзины
  const [sizeName, setSizeName] = useState(() =>
    product.sizes.length === 1 ? product.sizes[0].size.value : ''
  );
  return (
    <div className={styles.container}>
      <PriceRating
        price={product.price}
        oldPrice={product.oldPrice}
        discount={product.discount}
        productId={product.id}
      />
      <ProductColor
        colors={product.colors}
        size="big"
        colorName={colorName}
        setColorName={setColorName}
      />
      <SelectSize sizes={product.sizes} setSizeName={setSizeName} size="big" />
      <div className=" flex justify-between gap-[5%] mt-[3%]">
        <QuantityProduct />
        <Button size="lg" className={styles.button_cart}>
          <Image
            src="/header/cart-white.svg"
            alt="cart"
            width={20.63}
            height={18.79}
          />
          Add to cart
        </Button>

        <BadgeFavourites productId={product.id} button />
      </div>
      <DeliveryTable delivery={delivery} />
      {/* 
      <div className={styles.size}></div>
      <div className={styles.cart_favorites}></div>
      <div className={styles.delivery}></div>
      <div className={styles.bank_cards}></div> */}
    </div>
  );
};
