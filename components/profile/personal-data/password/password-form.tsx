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
import { toast } from 'react-toastify';
import { FC, useState } from 'react';
import {
  PersonalPasswordFormType,
  PersonalPasswordFormValidator,
} from '@/validators/personal-password-form-validator';
import { updatePasswordAction } from '@/server-action/user/update-password-action';

type PasswordFormProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PasswordForm: FC<PasswordFormProps> = ({ setIsOpen }) => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<PersonalPasswordFormType>({
    defaultValues: {
      currentPassword: '',
      newPassword: '',
    },
    resolver: zodResolver(PersonalPasswordFormValidator),
  });
  //Обработку ошибок и статус загрузки ,для серверного экшена, сделал по простому
  //т.к. библиотека, специльно для этого, next-safe-action, коректно не работала
  // и реактовские хуки(useFormState,useFotrmStatus)  геморройные и не работали с react-hook-form
  const onSubmit = (data: PersonalPasswordFormType) => {
    // console.log('data:', data);
    setIsLoading(true);
    updatePasswordAction(data)
      .then((res) => {
        setIsLoading(false);
        if (res.success) {
          toast.success(res.success);
          setIsOpen(false);
        }
        if (res.error) {
          toast.error(res.error);
        }
      })
      .catch(() => {
        setIsLoading(false);
        toast.error('Something went wrong');
      });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex flex-col gap-3 w-full  "
      >
        <FormField
          control={form.control}
          name="currentPassword"
          render={({ field }) => (
            <FormItem className=" relative">
              <FormLabel className="text-gray-700 text-sm font-normal">
                Current password
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  {...field}
                  className=" placeholder:text-zinc-400 text-sm font-normal"
                />
              </FormControl>
              <FormMessage className=" absolute text-[11px] top-[60px] " />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem className=" relative">
              <FormLabel className="text-gray-700 text-sm font-normal">
                New password
              </FormLabel>
              <FormControl>
                <Input
                  type="password"
                  {...field}
                  className=" placeholder:text-zinc-400 text-sm font-normal"
                />
              </FormControl>
              <FormMessage className=" absolute text-[11px] top-[60px] " />
            </FormItem>
          )}
        />

        <Button
          disabled={isLoading}
          type="submit"
          className=" w-full bg-cyan-800 hover:bg-cyan-900 mt-[12px] text-center text-white text-sm font-bold "
        >
          Save changes
        </Button>
      </form>
    </Form>
  );
};
