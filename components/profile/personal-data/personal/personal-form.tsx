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
import { updateNameAction } from '@/server-action/user/update-name-action';

import { FC, useState } from 'react';
import {
  PersonalNameFormType,
  PersonalNameFormValidator,
} from '@/validators/personal-name-form-validator';

type PersonalFormProps = {
  name: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PersonalForm: FC<PersonalFormProps> = ({ setIsOpen, name }) => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<PersonalNameFormType>({
    resolver: zodResolver(PersonalNameFormValidator),
    defaultValues: {
      name: name,
    },
  });
  //Обработку ошибок и статус загрузки ,для серверного экшена, сделал по простому
  //т.к. библиотека, специльно для этого, next-safe-action, коректно не работала
  // и реактовские хуки(useFormState,useFotrmStatus)  геморройные и не работали с react-hook-form
  const onSubmit = (data: PersonalNameFormType) => {
    // console.log('data:', data);
    setIsLoading(true);
    updateNameAction(data)
      .then(() => {
        setIsLoading(false);
        toast.success('Youre name has been changed');
        setIsOpen(false);
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
          name="name"
          render={({ field }) => (
            <FormItem className=" relative">
              <FormLabel className="text-gray-700 text-sm font-normal">
                Name
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder=" Your name"
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
