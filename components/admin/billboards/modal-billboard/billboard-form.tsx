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
import { BillboardType } from '@/types/carousel_type';
import {
  BillboardDataType,
  BillboardValidator,
} from '@/validators/billboard-validator ';
import { useBillboardPost } from '@/react-queries/admin/useBillboardPost';
import { useBillboardUpdate } from '@/react-queries/admin/useBillboardUpdate';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useCategoryQuery } from '@/react-queries/admin/useCategoryQuery';
import { deleteImg } from '@/utils/utapi-delete';
import BillboardImageUpload from './billboard-image-upload';
import { useEffect } from 'react';

type BillboardFormProps = {
  setSelectedImg?:
    | React.Dispatch<React.SetStateAction<string | undefined>>
    | undefined;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  billboard?: BillboardType;
};

export const BillboardForm = ({
  setIsOpen,
  billboard,
  setSelectedImg,
}: BillboardFormProps) => {
  const { data: categories, isError } = useCategoryQuery();
  const form = useForm<BillboardDataType>({
    resolver: zodResolver(BillboardValidator),
    defaultValues: {
      title: billboard?.title ?? '',
      subTitle: billboard?.subTitle ?? '',
      link: billboard?.link ?? '',
      image: billboard?.image ?? {},
    },
  });
  // есть  сценарий,когда пользователь выбирает картинку,
  //но потом закрывает модальное окно(соответственно картинка остаётся в aploadthing )
  // поэтому мы сохраняем картинку  в свой стейт, который
  //  будем использовать в modal-update-billboard, для удаления картинки

  useEffect(() => {
    if (billboard?.image) {
      setSelectedImg && setSelectedImg(form.getValues('image.url'));
    }
  }, [form.getValues('image.url')]);
  //useMutation для создания биллборда
  const createBillboard = useBillboardPost(setIsOpen);
  //useMutation для обновления биллборда
  const updateBillboard = useBillboardUpdate(setIsOpen);
  const onSubmit = async (data: BillboardDataType) => {
    console.log('billboard:', data);
    if (billboard) {
      updateBillboard.mutate({ billboard: data, id: billboard.id });
      if (billboard.image.fileKey !== data.image.fileKey) {
        await deleteImg(billboard.image.fileKey); // удаляем дефолтную  картинку из uploadthign
      }
    } else {
      createBillboard.mutate(data);
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
          name="title"
          render={({ field }) => (
            <FormItem className=" relative">
              <FormLabel className="text-gray-700 text-sm font-normal">
                Title
              </FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage className=" absolute text-[11px] top-[62px] " />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subTitle"
          render={({ field }) => (
            <FormItem className=" relative">
              <FormLabel className="text-gray-700 text-sm font-normal">
                Subtitle
              </FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormMessage className=" absolute text-[11px] top-[62px] " />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem className=" relative ">
              <FormLabel className="text-gray-700 text-sm font-normal">
                Select a category
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <div className="max-h-60 overflow-y-auto">
                      {isError ? (
                        <div className=" text-red-400">
                          Error,no data received
                        </div>
                      ) : (
                        categories?.map((category) => {
                          return (
                            <SelectItem key={category.id} value={category.id}>
                              {category.name}
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
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700 text-sm font-normal">
                Images
              </FormLabel>
              <FormControl>
                <BillboardImageUpload
                  defaultImg={billboard?.image}
                  value={field.value}
                  onChange={(url) => field.onChange(url)}
                  onRemove={(url) => field.onChange(url)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className=" flex justify-end">
          <Button
            type="submit"
            className=" w-[35%] h-10 bg-cyan-800 hover:bg-cyan-900 mt-[12px] "
          >
            Save billboard
          </Button>
        </div>
      </form>
    </Form>
  );
};
