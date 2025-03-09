import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, FormProvider } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form } from '@/components/ui/form';
import { RotateCw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { NameField } from './form-fields/name-field';
import { CustomersType } from '@/types/customers_type';
import {
  CustomersDataType,
  CustomersValidator,
} from '@/validators/customers-validator';
import { useCustomersPost } from '@/react-queries/admin/useCustomersPost';
import { useCustomersUpdate } from '@/react-queries/admin/useCustomersUpdate';
import { TiptapFild } from './form-fields/tiptap-field';

export const CustomerForm = ({ customer }: { customer?: CustomersType }) => {
  const route = useRouter();

  const form = useForm<CustomersDataType>({
    resolver: zodResolver(CustomersValidator),
    defaultValues: {
      name: customer ? customer.name : '',
      longtext: customer ? customer.longtext : '',
    },
  });

  const createCustomers = useCustomersPost();
  const updateCustomers = useCustomersUpdate();

  const onSubmit = async (data: CustomersDataType) => {
    if (customer) {
      const dataCustomer = { id: customer.id, customers: data };
      updateCustomers.mutate(dataCustomer);
      route.push('/admin/customers');
    } else {
      createCustomers.mutate(data);
      route.push('/admin/customers');
    }
  };

  return (
    <Form {...form}>
      <FormProvider {...form}>
        <form
          noValidate
          onSubmit={form.handleSubmit(onSubmit)}
          className=" flex flex-col gap-4  "
        >
          <div className=" flex flex-col gap-4">
            <NameField />
            <TiptapFild />
          </div>

          <div className=" flex justify-end">
            <Button
              disabled={createCustomers.isLoading || updateCustomers.isLoading}
              type="submit"
              className=" w-[25%] h-10 bg-cyan-800 hover:bg-cyan-900 mt-[12px] "
            >
              {createCustomers.isLoading || updateCustomers.isLoading ? (
                <RotateCw
                  size={20}
                  color="#ffffff"
                  strokeWidth={1.5}
                  absoluteStrokeWidth
                  className=" animate-spin"
                />
              ) : (
                <div>submit</div>
              )}
            </Button>
          </div>
        </form>
      </FormProvider>
    </Form>
  );
};
