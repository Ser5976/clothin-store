'use client';
import { ProductType } from '@/types/product_type';
import React from 'react';
import { ProductForm } from './product-form';

export const UpdateProductPage = ({ product }: { product: ProductType }) => {
  return (
    <main className=" flex flex-col gap-4">
      <h1 className=" text-zinc-800 font-semibold  leading-[130%]  text-xl lg:text-3xl">
        Update Product
      </h1>
      <ProductForm product={product} />
    </main>
  );
};
