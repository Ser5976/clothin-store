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
import { ColorType } from '@/types/color_type';
import { ColorDataType, ColorValidator } from '@/validators/color-validator';
import { useColorPost } from '@/react-queries/admin/useColorPost';
import { useColorUpdate } from '@/react-queries/admin/useColorUpdate';

type ColorFormProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  color?: ColorType;
};

export const ColorForm = ({ setIsOpen, color }: ColorFormProps) => {
  const form = useForm<ColorDataType>({
    resolver: zodResolver(ColorValidator),
    defaultValues: {
      name: color?.name ?? '',
      value: color?.value ?? '',
    },
  });
  //useMutation для создания цвета
  const createColor = useColorPost(setIsOpen);
  //useMutation для обновления размера
  const updateColor = useColorUpdate(setIsOpen);
  const onSubmit = (data: ColorDataType) => {
    if (color) {
      updateColor.mutate({ ...color, name: data.name, value: data.value });
    } else {
      createColor.mutate(data);
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
                  placeholder="Name color"
                  {...field}
                  className=" placeholder:text-zinc-400 text-sm font-normal"
                />
              </FormControl>
              <FormMessage className=" absolute text-[11px] top-[62px] " />
            </FormItem>
          )}
        />
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
                  placeholder="Value color"
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
            Save color
          </Button>
        </div>
      </form>
    </Form>
  );
};
