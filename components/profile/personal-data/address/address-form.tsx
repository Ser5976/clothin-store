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
import { toast } from 'react-toastify';
import { FC, useState } from 'react';
import { Address } from '@prisma/client';
import { Input } from '@/components/ui/input';
import {
  PersonalAddressFormType,
  PersonalAddressFormValidator,
} from '@/validators/personal-address-form-validator';
import { updateAddressAction } from '@/server-action/user/update-address-action';

type AddressFormProps = {
  address: Address | null;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AddressForm: FC<AddressFormProps> = ({ setIsOpen, address }) => {
  const [isLoading, setIsLoading] = useState(false);
  const form = useForm<PersonalAddressFormType>({
    defaultValues: {
      country: address ? address.country : '',
      city: address ? address.city : '',
      street: address ? address.street : '',
      house: address ? address.house : '',
      flat: address ? address.flat : '',
    },
    resolver: zodResolver(PersonalAddressFormValidator),
  });
  //Обработку ошибок и статус загрузки ,для серверного экшена, сделал по простому
  //т.к. библиотека, специльно для этого, next-safe-action, коректно не работала
  // и реактовские хуки(useFormState,useFotrmStatus)  геморройные и не работали с react-hook-form
  const onSubmit = (data: PersonalAddressFormType) => {
    // console.log('data:', data);
    setIsLoading(true);
    updateAddressAction({ address: data })
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
          name="country"
          render={({ field }) => (
            <FormItem className=" relative">
              <FormLabel className="text-gray-700 text-sm md:text-base  leading-relaxed">
                Country
              </FormLabel>
              <FormControl>
                <Input placeholder="Your Country" {...field} />
              </FormControl>
              <FormMessage className="absolute  top-[60px]" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem className=" relative">
              <FormLabel className="text-gray-700 text-sm md:text-base  leading-relaxed">
                City
              </FormLabel>
              <FormControl>
                <Input placeholder="Your City" {...field} />
              </FormControl>
              <FormMessage className="absolute  top-[60px]" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="street"
          render={({ field }) => (
            <FormItem className=" relative">
              <FormLabel className="text-gray-700 text-sm md:text-base  leading-relaxed">
                Street
              </FormLabel>
              <FormControl>
                <Input placeholder="Your Street" {...field} />
              </FormControl>
              <FormMessage className="absolute  top-[60px]" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="house"
          render={({ field }) => (
            <FormItem className=" relative">
              <FormLabel className="text-gray-700 text-sm md:text-base  leading-relaxed">
                House
              </FormLabel>
              <FormControl>
                <Input placeholder="Your House" {...field} />
              </FormControl>
              <FormMessage className="absolute  top-[60px]" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="flat"
          render={({ field }) => (
            <FormItem className=" relative">
              <FormLabel className="text-gray-700 text-sm md:text-base  leading-relaxed">
                Flat
              </FormLabel>
              <FormControl>
                <Input placeholder="Your Flat" {...field} />
              </FormControl>
              <FormMessage className="absolute  top-[60px]" />
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
