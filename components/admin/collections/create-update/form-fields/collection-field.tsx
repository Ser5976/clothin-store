import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { ProductType } from '@/types/product_type';
import { CollectionItemField } from './collection-item-field';

export type ProductOption = {
  productName: string;
  collectionItemId?: string;
  productId: string;
  imageUrl: string;
};

interface CollectionItemFildProps {
  collectionItem?: { id: string; productId: string; product: ProductType }[];
}

export const CollectionField = ({
  collectionItem,
}: CollectionItemFildProps) => {
  // выбор товаров в коллекцию
  const [selectedProducts, setSelectedProducts] = useState<ProductOption[]>(
    () => {
      if (collectionItem) {
        return [
          ...collectionItem.map((item) => ({
            productName: item.product.name,
            productId: item.productId,
            imageUrl: item.product.image?.[0]?.url || '',
            collectionItemId: item.id,
          })),
        ];
      }
      return [];
    }
  );
  console.log('selectedProducts:', selectedProducts);
  const form = useFormContext();

  useEffect(() => {
    form.setValue(
      'collectionItem',
      selectedProducts.map((item) => ({ productId: item.productId }))
    );
  }, [selectedProducts, setSelectedProducts]);

  return (
    <FormField
      control={form.control}
      name="collectionItem"
      render={({ field }) => (
        <FormItem className=" relative ">
          <FormLabel className="text-gray-700 text-sm font-normal">
            Select a products
          </FormLabel>
          <FormControl>
            <CollectionItemField
              selectedProducts={selectedProducts}
              setSelectedProducts={setSelectedProducts}
            />
          </FormControl>
          <FormMessage className=" absolute text-[11px] top-[60px] " />
        </FormItem>
      )}
    />
  );
};
