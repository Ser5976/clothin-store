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

  return (
    <div className={styles.container}>
      <PriceRating
        price={product.price}
        oldPrice={product.oldPrice}
        discount={product.discount}
        productId={product.id}
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
      <div className=" grid grid-cols-4 mt-[3%]">
        <div className=" flex gap-[7%] pr-[7%] max-[821px]:pr-[3%] max-[821px]:gap-[3%] col-span-3">
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
        </div>

        <BadgeFavourites
          productId={product.id}
          button
          className=" col-span-1"
        />
      </div>

      {/* 
      <div className={styles.size}></div>
      <div className={styles.cart_favorites}></div>
      <div className={styles.delivery}></div>
      <div className={styles.bank_cards}></div> */}
    </div>
  );
};
