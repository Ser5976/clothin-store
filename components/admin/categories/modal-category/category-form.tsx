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
import {
  CategoryDataType,
  CategoryValidator,
} from '@/validators/category-validator';

import { Input } from '@/components/ui/input';
import { useCategoryPost } from '@/react-queries/admin/useCategoryPost';
import { CategoryType } from '@/types/category_type';
import { useCategoryUpdate } from '@/react-queries/admin/useCategoryUpdate';

type CategoryFormProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  category?: CategoryType;
};

export const CategoryForm = ({ setIsOpen, category }: CategoryFormProps) => {
  const form = useForm<CategoryDataType>({
    resolver: zodResolver(CategoryValidator),
    defaultValues: {
      name: category?.name ?? '',
    },
  });
  //useMutation для создания категории
  const createCategory = useCategoryPost(setIsOpen);
  //useMutation для обновления категории
  const updateCategory = useCategoryUpdate(setIsOpen);
  const onSubmit = (data: CategoryDataType) => {
    if (category) {
      updateCategory.mutate({ ...category, name: data.name });
    } else {
      createCategory.mutate(data);
    }
  };

  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex flex-col gap-4 "
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
            Save category
          </Button>
        </div>
      </form>
    </Form>
  );
};
