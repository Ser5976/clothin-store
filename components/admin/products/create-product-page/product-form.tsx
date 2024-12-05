'use client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useState } from 'react';
import { RotateCw } from 'lucide-react';
import { toast } from 'react-toastify';
import {
  ProductDataType,
  ProductValidator,
} from '@/validators/product-validator ';
import { NameField } from './form-fields/name-field';
import { PriceField } from './form-fields/price-field';
import { OldPriceField } from './form-fields/oldPrice-field';
import { DescriptionField } from './form-fields/description-field';
import { CategoryField } from './form-fields/category-field';
import { TypeField } from './form-fields/type-field';
import { BrandField } from './form-fields/brand-field';
import { MaterialField } from './form-fields/material-field';
import { ColorField } from './form-fields/color-field';
import { SizeField } from './form-fields/size-field';
import { AvailabilityField } from './form-fields/availability-field';
import { BestsellerField } from './form-fields/bestseller-field';
import { FeaturedField } from './form-fields/featured-field';
import { ImageField } from './form-fields/image-field';

export const ProductForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProductDataType>({
    resolver: zodResolver(ProductValidator),
    defaultValues: {
      colorId: ['12334354623yi3i4ty2', '67243195842-5'],
      sizeId: [],
      name: '',
      price: 6,
      oldPrice: 7,
      typeId: '1',
      categoryId: '2',
      materialId: '3',
      brandId: '4',
      description: 'hhxjlocko',
      isAvailability: true,
      isFeatured: false,
      isBestseller: false,
      image: [],
    },
  });

  const onSubmit = (data: ProductDataType) => {
    console.log('data:', data);
  };

  return (
    <Form {...form}>
      <FormProvider {...form}>
        <form
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
          className=" flex flex-col gap-4  "
        >
          <div className=" grid grid-cols-2 gap-4">
            <NameField />
            <PriceField />
            <OldPriceField />
            <DescriptionField />
            <CategoryField />
            <TypeField />
            <BrandField />
            <MaterialField />
            <ColorField />
            <SizeField />
            <AvailabilityField />
            <BestsellerField />
            <FeaturedField />
          </div>
          <div className=" border p-4 rounded-md">
            <ImageField />
          </div>

          <div className=" flex justify-end">
            <Button
              disabled={isLoading}
              type="submit"
              className=" w-[25%] h-10 bg-cyan-800 hover:bg-cyan-900 mt-[12px] "
            >
              {isLoading ? (
                <RotateCw
                  size={20}
                  color="#ffffff"
                  strokeWidth={1.5}
                  absoluteStrokeWidth
                  className="mr-4  animate-spin"
                />
              ) : null}
              Add product
            </Button>
          </div>
        </form>
      </FormProvider>
    </Form>
  );
};
