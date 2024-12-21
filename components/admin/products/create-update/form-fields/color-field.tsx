import { Checkbox } from '@/components/ui/checkbox';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useColorQuery } from '@/react-queries/admin/useColorQuery';
import { Loader } from 'lucide-react';
import React from 'react';
import { useFormContext } from 'react-hook-form';

export const ColorField = () => {
  const { data: colors, isError, isLoading } = useColorQuery();
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name="colorId"
      render={() => (
        <FormItem className=" p-4 border rounded-md">
          <div className="mb-4">
            <FormLabel className="text-gray-700 text-sm font-normal">
              Colors
            </FormLabel>
            <FormDescription>Select a colors</FormDescription>
          </div>
          {isError ? (
            <div className=" text-red-400">Error,no data received</div>
          ) : isLoading ? (
            <div className=" w-[24px] lg:w-[50px] mx-auto my-[50px] animate-spin">
              <Loader size={24} color="#17696a" />
            </div>
          ) : (
            colors?.map((color) => (
              <FormField
                key={color.id}
                control={form.control}
                name="colorId"
                render={({ field }) => {
                  return (
                    <FormItem
                      key={color.id}
                      className="flex flex-row items-start space-x-3 space-y-0"
                    >
                      <FormControl>
                        <Checkbox
                          checked={field.value?.includes(color.id)}
                          onCheckedChange={(checked) => {
                            return checked
                              ? field.onChange([...field.value, color.id])
                              : field.onChange(
                                  field.value?.filter(
                                    (value: string) => value !== color.id
                                  )
                                );
                          }}
                        />
                      </FormControl>
                      <FormLabel className="text-sm font-normal">
                        {color.name}
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
