import { SheetClose } from '@/components/ui/sheet';
import { useFavoretesItemDelete } from '@/react-queries/useFavouritesItemDelete';
import { FavoritesItemsStoreType } from '@/types/type_favorites_items_store';
import { RotateCw, Trash2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const FavoritesItem = ({
  item,
  isAuth,
  refetch,
  deleteFavouritesItem,
}: {
  item: FavoritesItemsStoreType;
  isAuth: boolean;
  refetch: any;
  deleteFavouritesItem: (data: { productId: string }) => void;
}) => {
  //кастомный хук useMutation, удаляет товар из базе корзины
  const mutationDeleteItem = useFavoretesItemDelete(refetch);

  //удаление товара в базе или сторе favourites
  const deleteItem = () => {
    if (isAuth) {
      mutationDeleteItem.mutateAsync(item.productId);
    } else {
      deleteFavouritesItem({ productId: item.productId });
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

        <div className=" flex gap-10">
          <div className=" flex gap-1">
            <div className="text-red-500 text-base font-bold ">
              ${item.price}
            </div>
            {item.oldPrice ? (
              <div className="text-zinc-500 text-xs line-through">
                ${item.oldPrice}
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <div className="  w-[5%]">
        {mutationDeleteItem.isLoading ? (
          <RotateCw
            size={16}
            color="#424551"
            strokeWidth={1.5}
            absoluteStrokeWidth
            className="  animate-spin"
          />
        ) : (
          <Trash2
            size={16}
            strokeWidth={1}
            className=" hover:text-red-500 cursor-pointer"
            onClick={deleteItem}
          />
        )}
      </div>
    </div>
  );
};
