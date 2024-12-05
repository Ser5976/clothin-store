import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import React from 'react';
import { useFormContext } from 'react-hook-form';

export const DescriptionField = () => {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name="description"
      render={({ field }) => (
        <FormItem className=" relative">
          <FormLabel className="text-gray-700 text-sm font-normal">
            Description
          </FormLabel>
          <FormControl>
            <Textarea
              placeholder="Description"
              className="resize-none"
              {...field}
            />
          </FormControl>
          <FormMessage className=" absolute text-[11px] top-[83px] " />
        </FormItem>
      )}
    />
  );
};
