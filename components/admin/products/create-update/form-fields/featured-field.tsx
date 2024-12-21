import { Checkbox } from '@/components/ui/checkbox';
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from '@/components/ui/form';

import React from 'react';
import { useFormContext } from 'react-hook-form';

export const FeaturedField = () => {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name="isFeatured"
      render={({ field }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
          <FormControl>
            <Checkbox checked={field.value} onCheckedChange={field.onChange} />
          </FormControl>

          <FormLabel className="text-sm font-normal">Featured</FormLabel>
        </FormItem>
      )}
    />
  );
};
