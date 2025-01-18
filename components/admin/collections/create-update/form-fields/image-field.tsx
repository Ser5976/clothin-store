import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import CollectionImageUpload from './collection-image-upload';
import { TypeCollection } from '@/types/type_collection';

interface CollectionItemFildProps {
  collection: TypeCollection | undefined;
}

export const ImageField = ({ collection }: CollectionItemFildProps) => {
  const form = useFormContext();

  return (
    <FormField
      control={form.control}
      name="image"
      render={({ field }) => (
        <FormItem className=" relative ">
          <FormLabel className="text-gray-700 text-sm font-normal">
            Image for collection
          </FormLabel>
          <FormControl>
            <CollectionImageUpload
              defaultImg={collection?.image}
              value={field.value}
              onChange={(url) => field.onChange(url)}
              onRemove={(url) => field.onChange(url)}
            />
          </FormControl>
          <FormMessage className=" absolute text-[11px] top-[60px] " />
        </FormItem>
      )}
    />
  );
};
