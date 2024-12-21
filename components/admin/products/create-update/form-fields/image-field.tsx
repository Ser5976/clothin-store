import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import ImageUpload from '../image-upload';

export const ImageField = () => {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name="image"
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-gray-700 text-sm font-normal">
            Images
          </FormLabel>
          <FormControl>
            <ImageUpload
              value={field.value}
              onChange={(url) => field.onChange(url)}
              onRemove={(url) => field.onChange(url)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
