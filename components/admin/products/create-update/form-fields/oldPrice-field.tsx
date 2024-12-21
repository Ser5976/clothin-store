import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React from 'react';
import { useFormContext } from 'react-hook-form';

export const OldPriceField = () => {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name="oldPrice"
      render={({ field }) => (
        <FormItem className=" relative">
          <FormLabel className="text-gray-700 text-sm font-normal">
            Old price
          </FormLabel>
          <FormControl>
            <Input type="number" {...field} />
          </FormControl>
          <FormMessage className=" absolute text-[11px] top-[62px] " />
        </FormItem>
      )}
    />
  );
};
