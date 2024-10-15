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
  FormMessage,
} from '@/components/ui/form';
import AvatarUpload from './avatar-upload';
import { updateAvatarAction } from '@/server-action/user/update-avatar-action';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const formSchema = z.object({
  avatarUrl: z.string(),
});

type FormValues = z.infer<typeof formSchema>;
export const AvatarForm = ({
  avatar,
  handleModalClose,
  setIsOpen,
  setSelectedImg,
}: {
  avatar: string | undefined;
  handleModalClose: (isOpen: boolean) => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedImg: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      avatarUrl: avatar ? avatar : '',
    },
  });
  // есть ещё один сценарий,когда пользователь выбирает картинку,
  //но потом закрывает модальное окно(соответственно картинка остаётся в aploadthing )
  // поэтому мы сохраняем картинку  в свой стейт, который
  //  будем использовать в personal-data, для удаления картинки
  // да, блин , будет куча рендерингов, но как есть
  useEffect(() => {
    setSelectedImg(form.getValues('avatarUrl'));
  }, [form.getValues('avatarUrl')]);

  const onSubmit = async (data: FormValues) => {
    setSelectedImg(data.avatarUrl);
    updateAvatarAction({
      currentAvatar: avatar,
      newAvatar: data.avatarUrl,
    })
      .then(() => {
        setIsOpen(false);
        toast.success('Youre avatar has been changed');
      })
      .catch(() => {
        toast.error('Something went wrong');
      });
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
        >
          <FormField
            control={form.control}
            name="avatarUrl"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <AvatarUpload
                    urlAvatar={field.value}
                    defaultAvatar={avatar}
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
