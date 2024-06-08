import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { DeliveryType } from '@/types/delivery_type';
import { UseFormReturn } from 'react-hook-form';
import { FormSchemaType } from './form-schema';

// хотел передать данные из react-hook-form при помощи useFormContext,но Next начал ругаться, пришлось через пропсы
export const CheckoutForm = ({
  form,
  delivery,
}: {
  form: UseFormReturn<FormSchemaType>;
  delivery: DeliveryType[];
}) => {
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 gap-[3%] xl:grid-cols-2 xl:gap-[5%]">
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem className=" relative">
              <FormLabel className="text-gray-700 text-sm md:text-base  leading-relaxed">
                First Name
              </FormLabel>
              <FormControl>
                <Input placeholder="Your first name" {...field} />
              </FormControl>
              <FormMessage className="absolute  top-[65px]" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem className=" relative">
              <FormLabel className="text-gray-700 text-sm md:text-base  leading-relaxed">
                Last Name
              </FormLabel>
              <FormControl>
                <Input placeholder="Your last name" {...field} />
              </FormControl>
              <FormMessage className="absolute  top-[65px]" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className=" relative">
              <FormLabel className="text-gray-700 text-sm md:text-base  leading-relaxed">
                Email
              </FormLabel>
              <FormControl>
                <Input placeholder="Your working email" {...field} />
              </FormControl>
              <FormMessage className="absolute  top-[65px]" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className=" relative">
              <FormLabel className="text-gray-700 text-sm md:text-base  leading-relaxed">
                Phone
              </FormLabel>
              <FormControl>
                <Input placeholder="Your phone number" {...field} />
              </FormControl>
              <FormMessage className="absolute  top-[65px]" />
            </FormItem>
          )}
        />
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
              <FormMessage className="absolute  top-[65px]" />
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
              <FormMessage className="absolute  top-[65px]" />
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
              <FormMessage className="absolute  top-[65px]" />
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
              <FormMessage className="absolute  top-[65px]" />
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
              <FormMessage className="absolute  top-[65px]" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="postalCode"
          render={({ field }) => (
            <FormItem className=" relative">
              <FormLabel className="text-gray-700 text-sm md:text-base  leading-relaxed">
                Postal Code
              </FormLabel>
              <FormControl>
                <Input placeholder="Your Postal Code" {...field} />
              </FormControl>
              <FormMessage className="absolute  top-[65px]" />
            </FormItem>
          )}
        />
      </div>
      <div className="mt-[210px] xl:mt-24 mb-[10%]">
        <div className="text-zinc-800 text-lg  lg:text-xl xl:text-2xl font-bold leading-[31.20px] mb-[3%]">
          Shipping Method
        </div>
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-col gap-4"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={delivery[0].standartPrice} />
                    </FormControl>
                    <FormLabel className=" flex grow justify-between font-normal">
                      <span> standartPrice</span>
                      <span>$ {delivery[0].standartPrice}</span>
                    </FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={delivery[0].expressPrice} />
                    </FormControl>
                    <FormLabel className=" flex grow justify-between font-normal">
                      <span> expressPrice</span>
                      <span>$ {delivery[0].expressPrice}</span>
                    </FormLabel>
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};
