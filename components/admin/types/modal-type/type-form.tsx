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
import { TypeType } from '@/types/type_type';
import { TypeDataType, TypeValidator } from '@/validators/type-validator ';
import { useTypePost } from '@/react-queries/admin/useTypePost';
import { useTypeUpdate } from '@/react-queries/admin/useTypeUpdate';

type TypeFormProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  type?: TypeType;
};

export const TypeForm = ({ setIsOpen, type }: TypeFormProps) => {
  const form = useForm<TypeDataType>({
    resolver: zodResolver(TypeValidator),
    defaultValues: {
      name: type?.name ?? '',
    },
  });
  //useMutation для создания типа
  const createType = useTypePost(setIsOpen);
  //useMutation для обновления категории
  const updateType = useTypeUpdate(setIsOpen);
  const onSubmit = (data: TypeDataType) => {
    if (type) {
      updateType.mutate({ ...type, name: data.name });
    } else {
      createType.mutate(data);
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
                  placeholder="Category name"
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
            Save type
          </Button>
        </div>
      </form>
    </Form>
  );
};
