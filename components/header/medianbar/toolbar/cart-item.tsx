import { SheetClose } from '@/components/ui/sheet';
import { useCartDelete } from '@/react-queries/useCartDelete';
import { useCartUpdate } from '@/react-queries/useCartUpdate';
import { CartItemType } from '@/types/cart_type';
import { ArrowBigDown, ArrowBigUp, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './toolbar.module.css';

export const CartItem = ({
  item,
  isAuth,
  updateQuantityProduct,
  refetch,
  deleteProduct,
}: {
  item: CartItemType;
  isAuth: boolean;
  refetch: any;
  updateQuantityProduct: (data: {
    productId: string;
    quantity: number;
  }) => void;
  deleteProduct: (data: { productId: string }) => void;
}) => {
  //кастомный хук useMutation, изменяет данные  в базе
  //из-за нестабильной работы queryClient.invalidateQueries,изваращаюсь с refetch
  const mutationUpdateCart = useCartUpdate(refetch);

  //кастомный хук useMutation, удаляет товар из базе корзины
  const mutationDeleteCart = useCartDelete(refetch);

  //изменение количества товара в базе или в сторе корзины
  const plusOne = () => {
    if (isAuth) {
      mutationUpdateCart.mutateAsync({
        cartItemId: item.id,
        quantity: item.quantity + 1,
        price: Number(item.price),
        oldPrice: Number(item.oldPrice),
      });
    } else {
      updateQuantityProduct({
        productId: item.productId,
        quantity: item.quantity + 1,
      });
    }
  };
  const minusOne = () => {
    if (item.quantity === 1) return;
    if (isAuth) {
      mutationUpdateCart.mutateAsync({
        cartItemId: item.id,
        quantity: item.quantity - 1,
        price: Number(item.price),
        oldPrice: Number(item.oldPrice),
      });
    } else {
      updateQuantityProduct({
        productId: item.productId,
        quantity: item.quantity - 1,
      });
    }
  };
  //удаление товара в базе или сторе корзины
  const deleteCartItem = () => {
    if (isAuth) {
      mutationDeleteCart.mutateAsync(item.id);
    } else {
      deleteProduct({ productId: item.productId });
    }
  };
  return (
    <div className="flex py-4 border-b border-slate-200 last:border-none gap-4 mr-6">
      <SheetClose asChild>
        <Link
          href={`/${item.productId}`}
          className=" w-[25%] h-[25%] cursor-pointer"
        >
          <Image
            className="h-full w-full object-cover rounded"
            src={item.image}
            width={200}
            height={200}
            alt="Picture of the author"
            quality={100}
            priority
          />
        </Link>
      </SheetClose>

      <div className=" flex flex-col gap-2 w-[70%]  ">
        <div className="text-zinc-800 text-sm font-bold">{item.name}</div>
        <div className="text-zinc-500 text-xs">
          Color:<span className="text-gray-700 text-xs ">{item.color}</span>
        </div>
        <div className="text-zinc-500 text-xs">
          Size:<span className="text-gray-700 text-xs ">{item.size}</span>
        </div>
        <div className=" flex gap-10">
          <div className={styles.sheet_quantity_wrapper}>
            <div className={styles.sheet_quantity}>{item.quantity}</div>
            <div className={styles.sheet_quantity_icons}>
              <ArrowBigUp
                size={18}
                color="#17696A"
                className=" cursor-pointer mb-[-2px] fill-cyan-800 transition-colors hover:fill-cyan-900 "
                onClick={plusOne}
              />
              <ArrowBigDown
                size={18}
                color="#17696A"
                className=" cursor-pointer mt-[-2px]  fill-cyan-800 transition-colors hover:fill-cyan-900 "
                onClick={minusOne}
              />
            </div>
          </div>
          <div className=" flex gap-1">
            <div className="text-red-500 text-base font-bold ">
              ${item.totalPrice}
            </div>
            {item.totalOldPrice > 0 && (
              <div className="text-zinc-500 text-xs line-through">
                ${item.totalOldPrice}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="  w-[5%]">
        <Trash2
          size={16}
          strokeWidth={1}
          className=" hover:text-red-500 cursor-pointer"
          onClick={deleteCartItem}
        />
      </div>
    </div>
  );
};
