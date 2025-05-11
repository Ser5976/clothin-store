import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { BrandType } from '@/types/brand_type';
import { BrandDataType, BrandValidator } from '@/validators/brand-validator';
import { useBrandPost } from '@/react-queries/admin/useBrandPost';
import { useBrandUpdate } from '@/react-queries/admin/useBrandUpdate';

type BrandFormProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  brand?: BrandType;
};

export const BrandForm = ({ setIsOpen, brand }: BrandFormProps) => {
  const form = useForm<BrandDataType>({
    resolver: zodResolver(BrandValidator),
    defaultValues: {
      name: brand?.name ?? '',
    },
  });
  //useMutation для создания брэнда
  const createBrand = useBrandPost(setIsOpen);
  //useMutation для обновления брэнда
  const updateBrand = useBrandUpdate(setIsOpen);
  const onSubmit = (data: BrandDataType) => {
    if (brand) {
      updateBrand.mutate({ ...brand, name: data.name });
    } else {
      createBrand.mutate(data);
    }
  };

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex flex-col gap-4  "
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className=" relative">
              <FormLabel className="text-gray-700 text-sm font-normal">
                Name
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Brand name"
                  {...field}
                  className=" placeholder:text-zinc-400 text-sm font-normal"
                />
              </FormControl>
              <FormMessage className=" absolute text-[11px] top-[62px] " />
            </FormItem>
          )}
        />

        <div className=" flex justify-end">
          <Button
            type="submit"
            className=" w-[35%] h-10 bg-cyan-800 hover:bg-cyan-900 mt-[12px] "
          >
            Save brand
          </Button>
        </div>
      </form>
    </Form>
  );
};
