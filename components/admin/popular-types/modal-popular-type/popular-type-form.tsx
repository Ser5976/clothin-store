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
import { deleteImg } from '@/utils/utapi-delete';
import { useEffect } from 'react';
import { PopularTypesType } from '@/types/popular_types_type';
import { useTypeQuery } from '@/react-queries/admin/useTypeQuery';
import {
  PopularTypesDataType,
  PopularTypesValidator,
} from '@/validators/popular-types-validator';
import { usePopularTypePost } from '@/react-queries/admin/usePopularTypePost';
import { usePopularTypeUpdate } from '@/react-queries/admin/usePopularTypeUpdate';
import PopularTypeImageUpload from './popular-type-image-upload';

type PopularTypeFormProps = {
  setSelectedImg: React.Dispatch<React.SetStateAction<string | undefined>>;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  popularType?: PopularTypesType;
};

export const PopularTypeForm = ({
  setIsOpen,
  popularType,
  setSelectedImg,
}: PopularTypeFormProps) => {
  const { data: types, isError } = useTypeQuery('');
  const form = useForm<PopularTypesDataType>({
    resolver: zodResolver(PopularTypesValidator),
    defaultValues: {
      title: popularType?.title ?? '',
      link: popularType?.link ?? '',
      image: popularType?.image ?? {},
    },
  });
  // есть  сценарий,когда пользователь выбирает картинку,
  //но потом закрывает модальное окно(соответственно картинка остаётся в aploadthing )
  // поэтому мы сохраняем картинку  в свой стейт, который
  //  будем использовать в modal-update-popular-type, для удаления картинки

  useEffect(() => {
    setSelectedImg(form.getValues('image.url'));
  }, [form.getValues('image.url')]);

  //useMutation для создания populat type
  const createPopularType = usePopularTypePost(setIsOpen);
  //useMutation для обновления popular type
  const updatePopularType = usePopularTypeUpdate(setIsOpen);
  const onSubmit = async (data: PopularTypesDataType) => {
    //console.log('popular:', data);
    if (popularType) {
      updatePopularType.mutate({ popularType: data, id: popularType.id });
      if (popularType.image.fileKey !== data.image.fileKey) {
        await deleteImg(popularType.image.fileKey); // удаляем дефолтную  картинку из uploadthign
      }
    } else {
      createPopularType.mutate(data);
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
          name="link"
          render={({ field }) => (
            <FormItem className=" relative ">
              <FormLabel className="text-gray-700 text-sm font-normal">
                Select a type
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <div className="max-h-60 overflow-y-auto">
                      {isError ? (
                        <div className=" text-red-400">
                          Error,no data received
                        </div>
                      ) : (
                        types?.types?.map((type) => {
                          return (
                            <SelectItem key={type.id} value={type.id}>
                              {type.name}
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
                <PopularTypeImageUpload
                  defaultImg={popularType?.image}
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
            Save popular type
          </Button>
        </div>
      </form>
    </Form>
  );
};
