import { Button } from '@/components/ui/button';
import { useCartPost } from '@/react-queries/useCartPost';
import { useCartStore } from '@/stores/useCartStore';
import { ProductType } from '@/types/product_type';
import { addToCart } from '@/utils/add-to-cart';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { FC, useState } from 'react';
import SelectSize from '../../select-size/select-size';
import ProductColor from '../product-color/product-color';
import styles from './product-card-mini.module.css';

type FooterCardProps = {
  product: ProductType;
};
export const FooterCard: FC<FooterCardProps> = ({ product }) => {
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
  //получаем данные из стора
  const { refetch, cartBase, cartItems, setCartItems } = useCartStore(
    (state) => state
  );
  //кастомный хук useMutation, добавляет данные  в базу корзины
  //из-за нестабильной работы queryClient.invalidateQueries,изваращаюсь с refetch
  const mutationAddCart = useCartPost(refetch);

  return (
    <div className={styles.footer}>
      <div className={styles.name_product}>{product.name}</div>
      <div className={styles.price_product}>
        <div className={styles.price}>${product.price}</div>
        {product.oldPrice ? (
          <div className={styles.old_price}>${product.oldPrice}</div>
        ) : null}
      </div>
      <ProductColor
        size="small"
        colors={product.colors}
        colorName={colorName}
        setColorName={setColorName}
      />
      <SelectSize
        sizes={product.sizes}
        setSizeName={setSizeName}
        size="small"
      />
      <Button
        size="sm"
        className={styles.button_cart}
        onClick={() =>
          //добавление товара в корзину, функция в utils
          addToCart({
            product,
            cartStore: cartItems,
            cartBase: cartBase.cart ? cartBase.cart.items : [],
            colorName,
            sizeName,
            quantity: 1,
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
    </div>
  );
};
