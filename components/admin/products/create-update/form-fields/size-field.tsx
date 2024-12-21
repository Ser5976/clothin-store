import { Checkbox } from '@/components/ui/checkbox';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useSizeQuery } from '@/react-queries/admin/useSizeQuery';
import { Loader } from 'lucide-react';
import React from 'react';
import { useFormContext } from 'react-hook-form';

export const SizeField = () => {
  const { data: sizes, isError, isLoading } = useSizeQuery();
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name="sizeId"
      render={() => (
        <FormItem className=" p-4 border rounded-md">
          <div className="mb-4">
            <FormLabel className="text-gray-700 text-sm font-normal">
              Sizes
            </FormLabel>
            <FormDescription>Select a sizes</FormDescription>
          </div>
          {isError ? (
            <div className=" text-red-400">Error,no data received</div>
          ) : isLoading ? (
            <div className=" w-[24px] lg:w-[50px] mx-auto my-[50px] animate-spin">
              <Loader size={24} color="#17696a" />
            </div>
          ) : (
            sizes.map((size) => (
              <FormField
                key={size.id}
                control={form.control}
                name="sizeId"
                render={({ field }) => {
                  return (
                    <FormItem
                      key={size.id}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(size.id)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, size.id])
                              : field.onChange(
                                  field.value?.filter(
                                    (value: string) => value !== size.id
                                  )
                                );
                          }}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        {size.value}
                      </FormLabel>
                    </FormItem>
                  );
                }}
              />
            ))
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
