'use client';
import { BadgeFavourites } from '@/components/bage-favourites.tsx/badge-favourites';
import { Button } from '@/components/ui/button';
import { ProductType } from '@/types/product_type';
import Image from 'next/image';
import { useState } from 'react';
import { FC } from 'react';
import PriceRating from './price-rating';
import Productcolor from './product-color';
import styles from './product-sidebar.module.css';
import { QuantityProduct } from './quantity_product';
import SelectSize from './select-size';

type ProductSidebarProps = {
  product: ProductType;
};
export const ProductSidebar: FC<ProductSidebarProps> = ({ product }) => {
  //это состояние для цвета,понадобиться при формировани объекта продукта для корзины и для активного стиля
  // выбранного цвета
  const [colorName, setColorName] = useState(() =>
    product.colors.length === 1 ? product.colors[0].color.name : false
  );
  //это состояние для размера,понадобиться при формировани объекта продукта для корзины
  const [sizeName, setSizeName] = useState(() =>
    product.sizes.length === 1 ? product.sizes[0].size.value : false
  );
  console.log('sizeName:', sizeName);
  return (
    <div className={styles.container}>
      <PriceRating
        price={product.price}
        oldPrice={product.oldPrice}
        discount={product.discount}
        rating={product.rating}
      />
      <Productcolor
        colors={product.colors}
        colorName={colorName}
        setColorName={setColorName}
      />
      <SelectSize
        sizes={product.sizes}
        sizeName={sizeName}
        setSizeName={setSizeName}
      />
      <div className=" flex gap-[5%] mt-[3%]">
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

      {/* 
      <div className={styles.size}></div>
      <div className={styles.cart_favorites}></div>
      <div className={styles.delivery}></div>
      <div className={styles.bank_cards}></div> */}
    </div>
  );
};
