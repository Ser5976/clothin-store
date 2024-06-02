import { CartItemType } from '@/types/cart_type';
import { ProductType } from '@/types/product_type';
import { CartDataType } from '@/validators/cart-validator';
import { UseMutateAsyncFunction } from '@tanstack/react-query';
import { Session } from 'next-auth';
import { toast } from 'react-toastify';
type DataType = {
  product: ProductType;
  cartStore: CartItemType[];
  cartBase: CartItemType[];
  colorName: string;
  sizeName: string;
  quantity: number;
  mutate: UseMutateAsyncFunction<any, unknown, CartDataType, unknown>;
  setCartItems: (data: CartDataType) => void;
  isAuth: Session | null;
};
export const addToCart = (data: DataType) => {
  // проверяем если этот товар в корзине,если есть то уведомляем и не выполняем
  const storeItems = data.cartStore.some(
    (item) => item.productId === data.product.id
  );
  const baseItems = data.cartBase.some(
    (item) => item.productId === data.product.id
  );
  if (storeItems || baseItems) {
    toast.error('The product alredy exists in the cart');
    return;
  }
  // проверяем выбран ли цвет, если нет уведомляем и не выполняем
  if (!data.colorName) {
    toast.error('Choose the color of the product');
    return;
  }
  // проверяем выбран ли размер, если нет уведомляем и не выполняем
  if (!data.sizeName) {
    toast.error('Choose the size of the product');
    return;
  }
  // создаём товар
  const productCart = [
    {
      name: data.product.name,
      price: Number(data.product.price),
      oldPrice: data.product.oldPrice ? Number(data.product.oldPrice) : null,
      discount: data.product.discount ? Number(data.product.discount) : null,
      quantity: data.quantity,
      image: data.product.image[0].url,
      size: data.sizeName,
      color: data.colorName,
      productId: data.product.id,
      totalPrice: Number(data.product.price) * data.quantity,
      totalOldPrice: Number(data.product.oldPrice) * data.quantity,
    },
  ];
  // записываем,если в аторизованы в базу,если нет- в стор
  if (data.isAuth) {
    data.mutate(productCart);
  } else {
    data.setCartItems(productCart);
  }

  // уведомляем
  toast.success('The product has been added in the cart');
};
