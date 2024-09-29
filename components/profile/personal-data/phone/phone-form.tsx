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
import { toast } from 'react-toastify';
import { FC, useState } from 'react';
import {
  PersonalPhoneFormType,
  PersonalPhoneFormValidator,
} from '@/validators/personal-phone-form-validator';
import PhoneInput from 'react-phone-input-2'; //библиотека для форматирования телефонного номера
import { formattedPhone } from '@/utils/phone-formatting';
import { updatePhoneAction } from '@/server-action/user/update-phone-action';

type PhoneFormProps = {
  phone: string | null;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PhoneForm: FC<PhoneFormProps> = ({ setIsOpen, phone }) => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<PersonalPhoneFormType>({
    defaultValues: {
      phone: phone ? phone : '',
    },
    resolver: zodResolver(PersonalPhoneFormValidator),
  });
  //Обработку ошибок и статус загрузки ,для серверного экшена, сделал по простому
  //т.к. библиотека, специльно для этого, next-safe-action, коректно не работала
  // и реактовские хуки(useFormState,useFotrmStatus)  геморройные и не работали с react-hook-form
  const onSubmit = (data: PersonalPhoneFormType) => {
    // форматируем номер телефона,чтобы он записался в базу так как мы вносим
    const phone = formattedPhone(data.phone);
    console.log('data:', phone);
    setIsLoading(true);
    updatePhoneAction({ phone })
      .then(() => {
        setIsLoading(false);
        toast.success('Youre phone has been changed');
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
          name="phone"
          render={({ field: { ref, ...field } }) => (
            <FormItem className=" relative">
              <FormControl>
                <PhoneInput
                  {...field}
                  inputClass="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm 
                  transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium 
                  placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 
                  focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 mt-2"
                  inputProps={{
                    ref,
                    required: true,
                    autoFocus: true,
                  }}
                  country={'by'}
                  onlyCountries={['by']}
                  countryCodeEditable={false}
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
