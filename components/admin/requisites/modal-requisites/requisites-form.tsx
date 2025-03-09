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
import { BrandDataType, BrandValidator } from '@/validators/brand-validator';
import { useBrandPost } from '@/react-queries/admin/useBrandPost';
import { useBrandUpdate } from '@/react-queries/admin/useBrandUpdate';
import { RequisitesType } from '@/types/requisites_type';
import {
  RequisitesDataType,
  RequisitesValidator,
} from '@/validators/requisites-validator';
import { useRequisitesPost } from '@/react-queries/admin/useRequisitesPost';
import { useRequisitesUpdate } from '@/react-queries/admin/useRequisitesUpdate';

type RequisitesFormProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  requisites?: RequisitesType;
};

export const RequisitesForm = ({
  setIsOpen,
  requisites,
}: RequisitesFormProps) => {
  const form = useForm<RequisitesDataType>({
    resolver: zodResolver(RequisitesValidator),
    defaultValues: {
      title: requisites ? requisites.title : '',
      phone: requisites ? requisites.phone : '',
      email: requisites ? requisites.email : '',
    },
  });
  //useMutation для создания requisites
  const createRequisites = useRequisitesPost(setIsOpen);
  //useMutation для обновления requsites
  const updateRequisites = useRequisitesUpdate(setIsOpen);
  const onSubmit = (data: RequisitesDataType) => {
    if (requisites) {
      updateRequisites.mutate({
        requisites: data,
        requisitesId: requisites.id,
      });
    } else {
      createRequisites.mutate(data);
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
                <Input
                  type="text"
                  placeholder="Title"
                  {...field}
                  className=" placeholder:text-zinc-400 text-sm font-normal"
                />
              </FormControl>
              <FormMessage className=" absolute text-[11px] top-[62px] " />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem className=" relative">
              <FormLabel className="text-gray-700 text-sm font-normal">
                Phone
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Phone"
                  {...field}
                  className=" placeholder:text-zinc-400 text-sm font-normal"
                />
              </FormControl>
              <FormMessage className=" absolute text-[11px] top-[62px] " />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className=" relative">
              <FormLabel className="text-gray-700 text-sm font-normal">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Email"
                  {...field}
                  className=" placeholder:text-zinc-400 text-sm font-normal"
                />
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
            Save requisite
          </Button>
        </div>
      </form>
    </Form>
  );
};
