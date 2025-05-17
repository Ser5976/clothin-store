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
import { DeliveryType } from '@/types/delivery_type';
import {
  DeliveryDataType,
  DeliveryValidator,
} from '@/validators/delivery-validator';
import { useDeliveryPost } from '@/react-queries/admin/useDeliveryPost';
import { useDeliveryUpdate } from '@/react-queries/admin/useDeliveryUpdate';
import { Textarea } from '@/components/ui/textarea';

type DeliveryFormProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  delivery?: DeliveryType;
};

export const DeliveryForm = ({ setIsOpen, delivery }: DeliveryFormProps) => {
  const form = useForm<DeliveryDataType>({
    resolver: zodResolver(DeliveryValidator),
    defaultValues: {
      longtext: delivery
        ? delivery.longtext
        : 'We will deliver your purchase anywhere in Belarus',
      standartPrice: delivery ? delivery.standartPrice : '5',
      expressPrice: delivery ? delivery.expressPrice : '10',
      orderPrice: delivery ? delivery.orderPrice : '500',
    },
  });

  //useMutation для создания delivery
  const createDelivery = useDeliveryPost(setIsOpen);
  //useMutation для обновления биллборда
  const updateDelivery = useDeliveryUpdate(setIsOpen);
  const onSubmit = async (data: DeliveryDataType) => {
    if (delivery) {
      updateDelivery.mutate({ id: delivery.id, delivery: data });
    } else {
      createDelivery.mutate(data);
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
          name="longtext"
          render={({ field }) => (
            <FormItem className=" relative">
              <FormLabel className="text-gray-700 text-sm font-normal">
                Title
              </FormLabel>
              <FormControl>
                <Textarea className="resize-none" {...field} />
              </FormControl>
              <FormMessage className=" absolute text-[11px] top-[62px] " />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="standartPrice"
          render={({ field }) => (
            <FormItem className=" relative">
              <FormLabel className="text-gray-700 text-sm font-normal">
                The usual shipping price
              </FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage className=" absolute text-[11px] top-[62px] " />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="expressPrice"
          render={({ field }) => (
            <FormItem className=" relative">
              <FormLabel className="text-gray-700 text-sm font-normal">
                The price of the express delivery
              </FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage className=" absolute text-[11px] top-[62px] " />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="orderPrice"
          render={({ field }) => (
            <FormItem className=" relative">
              <FormLabel className="text-gray-700 text-sm font-normal">
                The order price for free shipping
              </FormLabel>
              <FormControl>
                <Input type="number" {...field} />
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
            Save
          </Button>
        </div>
      </form>
    </Form>
  );
};
