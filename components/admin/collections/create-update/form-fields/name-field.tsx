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

export const NameField = () => {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name="name"
      render={({ field }) => (
        <FormItem className=" relative">
          <FormLabel className="text-gray-700 text-sm font-normal">
            Name
          </FormLabel>
          <FormControl>
            <Input type="text" {...field} />
          </FormControl>
          <FormMessage className=" absolute text-[11px] top-[62px] " />
        </FormItem>
      )}
    />
  );
};
