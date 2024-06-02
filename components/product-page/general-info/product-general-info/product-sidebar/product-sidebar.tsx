'use client';
import { BadgeFavourites } from '@/components/bage-favourites.tsx/badge-favourites';
import SelectSize from '@/components/product-page/select-size/select-size';
import { Button } from '@/components/ui/button';
import { useCartPost } from '@/react-queries/useCartPost';
import { useCartStore } from '@/stores/useCartStore';
import { DeliveryType } from '@/types/delivery_type';
import { ProductType } from '@/types/product_type';
import { addToCart } from '@/utils/add-to-cart';
import { useSession } from 'next-auth/react';
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
  //проверка авторизации
  const { data } = useSession();

  //цвет товара,понадобиться при формировани объекта продукта, для корзины и для активного стиля выбранного цвета
  const [colorName, setColorName] = useState(() =>
    product.colors.length === 1 ? product.colors[0].color.name : ''
  );
  //размер товара,понадобиться при формировани объекта продукта, для корзины
  const [sizeName, setSizeName] = useState(() =>
    product.sizes.length === 1 ? product.sizes[0].size.value : ''
  );
  //изменения количества товара
  const [quantity, setQuantity] = useState(1);

  //получаем данные из стора
  const { refetch, cartBase, cartItems, setCartItems } = useCartStore(
    (state) => state
  );
  //кастомный хук useMutation, добавляет данные  в базу корзины
  //из-за нестабильной работы queryClient.invalidateQueries,изваращаюсь с refetch
  const mutationAddCart = useCartPost(refetch);

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
        <QuantityProduct quantity={quantity} setQuantity={setQuantity} />
        <Button
          size="lg"
          className={styles.button_cart}
          onClick={() =>
            //добавление товара в корзину, функция в utils
            addToCart({
              product,
              cartStore: cartItems,
              cartBase: cartBase.cart ? cartBase.cart.items : [],
              colorName,
              sizeName,
              quantity,
              mutate: mutationAddCart.mutateAsync,
              setCartItems: setCartItems,
              isAuth: data,
            })
          }
        >
          <Image
            src="/header/cart-white.svg"
            alt="cart"
            width={20.63}
            height={18.79}
          />
          Add to cart
        </Button>

        <BadgeFavourites
          product={{
            productId: product.id,
            name: product.name,
            price: Number(product.price),
            oldPrice: Number(product.oldPrice),
            image: product.image[0].url,
          }}
          button
        />
      </div>
      <DeliveryTable delivery={delivery} />
    </div>
  );
};
