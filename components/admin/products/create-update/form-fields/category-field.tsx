import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCategoryQuery } from '@/react-queries/admin/useCategoryrQuery';
import React from 'react';
import { useFormContext } from 'react-hook-form';

export const CategoryField = () => {
  const { data: categories, isError } = useCategoryQuery();
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name="categoryId"
      render={({ field }) => (
        <FormItem className=" relative ">
          <FormLabel className="text-gray-700 text-sm font-normal">
            Select a category
          </FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <div className="max-h-60 overflow-y-auto">
                  {isError ? (
                    <div className=" text-red-400">Error,no data received</div>
                  ) : (
                    categories?.map((category) => {
                      return (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      );
                    })
                  )}
                </div>
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage className=" absolute text-[11px] top-[60px] " />
        </FormItem>
      )}
    />
  );
};
