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
      `Are you sure you want to delete user ${product.name}`
    );
    if (userConfirmed) {
      mutationDeleteProduct.mutate(product.id);
    }
  };
  return (
    <div className=" flex justify-between border-t border-gray-400 text-gray-400  ">
      <Link
        href={`/${product.id}`}
        className=" hover:text-gray-800 cursor-pointer"
      >
        {product.name}
      </Link>
      <div className=" flex gap-2">
        <Pencil size={18} className=" hover:text-gray-800 cursor-pointer" />
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