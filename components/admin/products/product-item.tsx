import Link from 'next/link';
import React from 'react';
import { Pencil, RotateCw, X } from 'lucide-react';
import { ProductType } from '@/types/product_type';
import { useProductDelete } from '@/react-queries/admin/useProductDelete';

export const ProductItem = ({ product }: { product: ProductType }) => {
  //кастомный хук useMutation, удаляет товар из базе корзины
  const mutationDeleteProduct = useProductDelete();
  // удаление товара
  const productDelete = () => {
    const userConfirmed = window.confirm(
      `Are you sure you want to delete product ${product.name}`
    );
    if (userConfirmed) {
      mutationDeleteProduct.mutate(product.id);
    }
  };
  return (
    <div className=" flex items-center justify-between border-t border-gray-400 text-gray-400 h-10  ">
      <Link
        href={`/${product.id}`}
        className=" hover:text-gray-800 cursor-pointer"
      >
        {product.name}
      </Link>
      <div className=" flex gap-2">
        <Link href={`/admin/products/update-product/${product.id}`}>
          <Pencil size={18} className=" hover:text-gray-800 " />
        </Link>

        {mutationDeleteProduct.isLoading ? (
          <RotateCw size={20} className="   animate-spin" />
        ) : (
          <X
            size={20}
            className=" hover:text-gray-800 cursor-pointer"
            onClick={productDelete}
          />
        )}
      </div>
    </div>
  );
};
