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
import { MaterialType } from '@/types/material_type';
import {
  MaterialDataType,
  MaterialValidator,
} from '@/validators/material-validator';
import { useMaterialUpdate } from '@/react-queries/admin/useMaterialUpdate';
import { useMaterialPost } from '@/react-queries/admin/useMaterialPost';

type MaterialFormProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  material?: MaterialType;
};

export const MaterialForm = ({ setIsOpen, material }: MaterialFormProps) => {
  const form = useForm<MaterialDataType>({
    resolver: zodResolver(MaterialValidator),
    defaultValues: {
      name: material?.name ?? '',
    },
  });
  //useMutation для создания material
  const createMaterial = useMaterialPost(setIsOpen);
  //useMutation для обновления material
  const updateMaterial = useMaterialUpdate(setIsOpen);
  const onSubmit = (data: MaterialDataType) => {
    if (material) {
      updateMaterial.mutate({ ...material, name: data.name });
    } else {
      createMaterial.mutate(data);
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
                  placeholder="Material name"
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
