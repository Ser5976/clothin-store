'use client';
import React from 'react';
import { ProductForm } from './product-form';

export const CreateProductPage = () => {
  return (
    <main className=" flex flex-col gap-4">
      <h1 className=" text-zinc-800 font-semibold  leading-[130%]  text-xl lg:text-3xl">
        Create Product
      </h1>
      <ProductForm />
    </main>
  );
};
