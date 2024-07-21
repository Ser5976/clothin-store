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
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { z } from 'zod';
import { FC } from 'react';
import { useReviewPost } from '@/react-queries/useReviewPost';
import { DialogClose } from '@/components/ui/dialog';

const ReviewFormValidator = z.object({
  name: z.string().min(1, 'Name is required'),
  content: z.string().min(1, 'Review is required'),
  estimation: z.string({ required_error: 'Select is required' }),
});

type ReviewFormType = z.infer<typeof ReviewFormValidator>;

type LeaveReviewFormProps = {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  productId: string;
  refetchEstimation: any;
  refetchReviews: any;
};

export const LeaveReviewForm: FC<LeaveReviewFormProps> = ({
  setIsOpen,
  productId,
  refetchEstimation,
  refetchReviews,
}) => {
  const form = useForm<ReviewFormType>({
    resolver: zodResolver(ReviewFormValidator),
    defaultValues: {
      name: '',
      content: '',
    },
  });

  const mutationRiview = useReviewPost(refetchEstimation, refetchReviews);
  const onSubmit = (data: ReviewFormType) => {
    //console.log('data:', data);
    const review = { ...data, productId };
    mutationRiview.mutateAsync(review);
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
        <FormField
          control={form.control}
          name="estimation"
          render={({ field }) => (
            <FormItem className=" relative ">
              <FormLabel className="text-gray-700 text-sm font-normal">
                Rating
              </FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a rating" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage className=" absolute text-[11px] top-[60px] " />
            </FormItem>
          )}
        />
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
                  className="resize-none"
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
          Submit a review
        </Button>
      </form>
    </Form>
  );
};
