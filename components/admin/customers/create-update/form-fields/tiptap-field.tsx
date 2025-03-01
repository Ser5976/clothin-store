import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import React from 'react';
import { useFormContext } from 'react-hook-form';
import { TiptapEditor } from './tiptap/tiptap-editor';

export const TiptapFild = () => {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name="longtext"
      render={({ field }) => (
        <FormItem className=" relative ">
          <FormLabel className="text-gray-700 text-sm font-normal">
            Content
          </FormLabel>
          <FormControl>
            <TiptapEditor content={field.value} onChange={field.onChange} />
          </FormControl>
          <FormMessage className=" absolute text-[11px] top-[90px] " />
        </FormItem>
      )}
    />
  );
};
