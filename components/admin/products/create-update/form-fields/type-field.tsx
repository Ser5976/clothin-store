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
import { useTypeQuery } from '@/react-queries/admin/useTypeQuery';
import React from 'react';
import { useFormContext } from 'react-hook-form';

export const TypeField = () => {
  const { data: types, isError } = useTypeQuery('');
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name="typeId"
      render={({ field }) => (
        <FormItem className=" relative ">
          <FormLabel className="text-gray-700 text-sm font-normal">
            Select a type
          </FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a type" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <div className="max-h-60 overflow-y-auto">
                  {isError ? (
                    <div className=" text-red-400">Error,no data received</div>
                  ) : (
                    types?.types?.map((type) => {
                      return (
                        <SelectItem key={type.id} value={type.id}>
                          {type.name}
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
