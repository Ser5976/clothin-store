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
import { Textarea } from '@/components/ui/textarea';
import { FC } from 'react';
import { useStoreReviewPost } from '@/react-queries/useStoreReviewPost';
import {
  StoreReviewDataType,
  StoreReviewValidator,
} from '@/validators/store-review-validator';

type LeaveStoreReviewFormProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LeaveStoreReviewForm: FC<LeaveStoreReviewFormProps> = ({
  setIsOpen,
}) => {
  const form = useForm<StoreReviewDataType>({
    resolver: zodResolver(StoreReviewValidator),
    defaultValues: {
      content: '',
    },
  });

  const mutationStoreRiview = useStoreReviewPost();
  const onSubmit = (data: StoreReviewDataType) => {
    //console.log('data:', data);

    mutationStoreRiview.mutateAsync(data);
    setIsOpen(false);
    toast.success('Your review has been saved');
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex flex-col gap-3 w-full  "
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem className=" relative">
              <FormLabel className="text-gray-700 text-sm font-normal">
                Review
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="leave a review"
                  className="resize-none min-h-[150px]"
                  {...field}
                />
              </FormControl>
              <FormMessage className=" absolute text-[11px] top-[83px] " />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className=" w-full bg-cyan-800 hover:bg-cyan-900 mt-[12px] text-center text-white text-sm font-bold "
        >
          Submit a store review
        </Button>
      </form>
    </Form>
  );
};
