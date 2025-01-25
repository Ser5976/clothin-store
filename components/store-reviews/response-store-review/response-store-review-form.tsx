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
  StoreResponseDataType,
  StoreResponseValidator,
} from '@/validators/response-review-validator';
import { StoreReviewType } from '@/types/stor_review_type';
import reviewsInfo from '@/components/product-page/general-info/product-reviews/reviews-info';
import { useStoreReviewUpdate } from '@/react-queries/useStoreReviewUpdate';

type ResponseStoreReviewFormProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  review: StoreReviewType;
};

export const ResponseStoreReviewForm: FC<ResponseStoreReviewFormProps> = ({
  setIsOpen,
  review,
}) => {
  const form = useForm<StoreResponseDataType>({
    resolver: zodResolver(StoreResponseValidator),
    defaultValues: {
      response: '',
    },
  });

  const mutationStoreRiviewUpdate = useStoreReviewUpdate();
  const onSubmit = (data: StoreResponseDataType) => {
    //console.log('data:', data);

    mutationStoreRiviewUpdate.mutate({
      id: review.id,
      storeReview: { content: review.content, response: data.response },
    });
    setIsOpen(false);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex flex-col gap-3 w-full  "
      >
        <FormField
          control={form.control}
          name="response"
          render={({ field }) => (
            <FormItem className=" relative">
              <FormLabel className="text-gray-700 text-sm font-normal">
                Response
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="response to the review"
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
          Submit a store response
        </Button>
      </form>
    </Form>
  );
};
