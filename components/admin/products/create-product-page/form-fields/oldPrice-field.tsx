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
            <Input
              type="number"
              placeholder="Old price"
              {...field}
              onChange={(e) => {
                // Преобразуем значение в число
                field.onChange(Number(e.target.value));
              }}
              className=" placeholder:text-zinc-400 text-sm font-normal"
            />
          </FormControl>
          <FormMessage className=" absolute text-[11px] top-[62px] " />
        </FormItem>
      )}
    />
  );
};
