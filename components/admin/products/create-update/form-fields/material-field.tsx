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
import { useMaterialQuery } from '@/react-queries/admin/useMaterialQuery';
import React from 'react';
import { useFormContext } from 'react-hook-form';

export const MaterialField = () => {
  const { data: materials, isError } = useMaterialQuery('');
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name="materialId"
      render={({ field }) => (
        <FormItem className=" relative ">
          <FormLabel className="text-gray-700 text-sm font-normal">
            Select a material
          </FormLabel>
          <FormControl>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a material" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                <div className="max-h-60 overflow-y-auto">
                  {isError ? (
                    <div className=" text-red-400">Error,no data received</div>
                  ) : (
                    materials?.materials?.map((material) => {
                      return (
                        <SelectItem key={material.id} value={material.id}>
                          {material.name}
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
