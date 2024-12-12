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
import { SizeType } from '@/types/size_type';
import { SizeDataType, SizeValidator } from '@/validators/size-validator';
import { useSizePost } from '@/react-queries/admin/useSizePost';
import { useSizeUpdate } from '@/react-queries/admin/useSizeUpdate';

type SizeFormProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  size?: SizeType;
};

export const SizeForm = ({ setIsOpen, size }: SizeFormProps) => {
  const form = useForm<SizeDataType>({
    resolver: zodResolver(SizeValidator),
    defaultValues: {
      value: size?.value ?? '',
    },
  });
  //useMutation для создания размера
  const createSize = useSizePost(setIsOpen);
  //useMutation для обновления размера
  const updateSize = useSizeUpdate(setIsOpen);
  const onSubmit = (data: SizeDataType) => {
    if (size) {
      updateSize.mutate({ ...size, value: data.value });
    } else {
      createSize.mutate(data);
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
          name="value"
          render={({ field }) => (
            <FormItem className=" relative">
              <FormLabel className="text-gray-700 text-sm font-normal">
                Value
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Size value"
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
            Save size
          </Button>
        </div>
      </form>
    </Form>
  );
};
