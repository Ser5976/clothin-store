import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useBrandQuery } from '@/react-queries/admin/useBrandQuery';
import React from 'react';
import { useFormContext } from 'react-hook-form';

export const BrandField = () => {
  const { data: brand, isError } = useBrandQuery('');
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name="brandId"
      render={({ field }) => (
        <FormItem className=" relative ">
          <FormLabel className="text-gray-700 text-sm font-normal">
            Select a brand
          </FormLabel>

          <Select onValueChange={field.onChange} defaultValue={field.value}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="select a brand" />
              </SelectTrigger>
            </FormControl>

            <SelectContent>
              <div className="max-h-60 overflow-y-auto">
                {isError ? (
                  <div className=" text-red-400">Error,no data received</div>
                ) : (
                  brand?.brands.map((brand) => {
                    return (
                      <SelectItem key={brand.id} value={brand.id}>
                        {brand.name}
                      </SelectItem>
                    );
                  })
                )}
              </div>
            </SelectContent>
          </Select>

          <FormMessage className=" absolute text-[11px] top-[60px] " />
        </FormItem>
      )}
    />
  );
};
