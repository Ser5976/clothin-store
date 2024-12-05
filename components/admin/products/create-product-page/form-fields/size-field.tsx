import { Checkbox } from '@/components/ui/checkbox';
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import React from 'react';
import { useFormContext } from 'react-hook-form';

const sizes = [
  {
    id: '12334354623yi3i4ty2',
    label: 'L',
  },
  {
    id: '5278239034t-5[40]',
    label: 'S',
  },
  {
    id: '67243195842-5',
    label: 'XL',
  },
] as const;

export const SizeField = () => {
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
          {sizes.map((item) => (
            <FormField
              key={item.id}
              control={form.control}
              name="sizeId"
              render={({ field }) => {
                return (
                  <FormItem
                    key={item.id}
                    className="flex flex-row items-start space-x-3 space-y-0"
                  >
                    <FormControl>
                      <Checkbox
                        checked={field.value?.includes(item.id)}
                        onCheckedChange={(checked) => {
                          return checked
                            ? field.onChange([...field.value, item.id])
                            : field.onChange(
                                field.value?.filter(
                                  (value: string) => value !== item.id
                                )
                              );
                        }}
                      />
                    </FormControl>
                    <FormLabel className="text-sm font-normal">
                      {item.label}
                    </FormLabel>
                  </FormItem>
                );
              }}
            />
          ))}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
