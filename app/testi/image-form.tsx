'use client';
import * as z from 'zod';
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
import ImageUpload from './image-upload';
import { Item } from '@radix-ui/react-select';

const formSchema = z.object({
  imageUrl: z
    .array(
      z.object({
        url: z.string(),
        fileKey: z.string(),
        id: z.string().optional(),
      })
    )
    .min(1, { message: 'Image required' })
    .max(4, { message: 'No more than 5 images' }),
});

type FormValues = z.infer<typeof formSchema>;

const imgArray = [
  {
    id: '12730978-7e28-4145-9632-54db761aed30',
    url: 'https://utfs.io/f/18c053eb-bea9-49ed-bc9a-71534ba2f532-h40jwx.jpg',
    fileKey: '18c053eb-bea9-49ed-bc9a-71534ba2f532-h40jwx.jpg',
  },
];

export const ImageForm = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageUrl: [],
    },
  });

  const onSubmit = async (data: FormValues) => {
    // фильтруем данные (удаляем те,что у нас есть в базе(это объекты с id))
    let test = data.imageUrl.filter((item) => (item.id ? false : true));
    console.log('Data:', test);
  };
  console.log('getValue:', form.getValues('imageUrl'));
  return (
    <>
      <div className="flex items-center justify-between">
        <div className=" text-lg"> Загрузка файла</div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value}
                    onChange={(url) => field.onChange(url)}
                    onRemove={(url) => field.onChange(url)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button className="ml-auto" type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
};
