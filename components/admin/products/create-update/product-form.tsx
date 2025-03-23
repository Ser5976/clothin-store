import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { useState } from 'react';
import { RotateCw } from 'lucide-react';
import {
  ProductDataType,
  ProductValidator,
} from '@/validators/product-validator';
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
import { ProductType } from '@/types/product_type';
import { useProductPost } from '@/react-queries/admin/useProductPost';
import { useProductUpdate } from '@/react-queries/admin/useProductUpdate';
import { useRouter } from 'next/navigation';

export const ProductForm = ({ product }: { product?: ProductType }) => {
  const route = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<ProductDataType>({
    resolver: zodResolver(ProductValidator),
    defaultValues: {
      colorId: product ? product.colors.map((color) => color.color.id) : [],
      sizeId: product ? product.sizes.map((size) => size.size.id) : [],
      name: product ? product.name : '',
      price: product ? product.price : '',
      oldPrice: product ? (product.oldPrice ? product.oldPrice : '') : '',
      typeId: product ? product.typeId : '',
      categoryId: product ? product.categoryId : '',
      materialId: product ? product.materialId : '',
      brandId: product ? product.brandId : '',
      description: product ? product.description : '',
      isAvailability: true,
      isFeatured: false,
      isBestseller: false,
      image: product ? product.image : [],
    },
  });

  const createProduct = useProductPost();
  const updateProduct = useProductUpdate();

  const onSubmit = (data: ProductDataType) => {
    console.log('data:', data);
    if (product) {
      const dataProduct = { id: product.id, product: data };
      updateProduct.mutate(dataProduct);
      route.push('/admin/products');
    } else {
      createProduct.mutate(data);
      route.push('/admin/products');
    }
  };

  return (
    <Form {...form}>
      <FormProvider {...form}>
        <form
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
          className=" flex flex-col gap-4  "
        >
          <div className=" grid grid-cols-2 gap-4 max-[700px]:grid-cols-1">
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
