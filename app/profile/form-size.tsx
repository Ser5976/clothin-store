'use client';
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
import { SizeDataType, SizeValidator } from '@/validators/size-validator';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import { RotateCw } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

type PropsType = {
  params: { id: string; value: string } | null;
};

export default function FormSize({ params }: PropsType) {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation({
    mutationFn: async (value: SizeDataType) => {
      const response = await axios.post('/api/size', value);
      return response;
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          return toast.error(error.response?.data);
        }
        if (error.response?.status === 400) {
          return toast.error(error.response?.data);
        }
        if (error.response?.status === 404) {
          return toast.error('Not Found');
        }
        return toast.error('Something went wrong');
      }
      return toast.error('Something went wrong');
    },
    onSuccess: ({ data }) => {
      // console.log('MutateData:', data);
      form.reset();
      queryClient.invalidateQueries({ queryKey: ['size'] });
      router.refresh(); //обновит текущий маршрут
      return toast.success(data.message);
    },
  });
  const { mutate: editMutade, isLoading: EditIsloding } = useMutation({
    mutationFn: async (value: SizeDataType) => {
      const response = await axios.put(`/api/size/${params?.id}`, value);
      return response;
    },
    onError: (error) => {
      if (error instanceof AxiosError) {
        if (error.response?.status === 401) {
          return toast.error(error.response?.data);
        }
        if (error.response?.status === 400) {
          return toast.error(error.response?.data);
        }
        if (error.response?.status === 404) {
          return toast.error('Not Found');
        }
        return toast.error('Something went wrong');
      }
      return toast.error('Something went wrong');
    },
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries({ queryKey: ['size'] });
      router.refresh();
      return toast.success(data.message);
    },
  });

  const form = useForm<SizeDataType>({
    defaultValues: {
      value: params ? params.value : '',
    },
    resolver: zodResolver(SizeValidator),
  });
  const onSubmit = (data: SizeDataType) => {
    // console.log('dataSize:', data);
    if (params) {
      editMutade(data);
    } else {
      mutate(data);
    }
  };
  return (
    <Form {...form}>
      <form
        noValidate
        onSubmit={form.handleSubmit(onSubmit)}
        className=" flex flex-col gap-6 w-[300px]  "
      >
        <FormField
          control={form.control}
          name="value"
          render={({ field }) => (
            <FormItem className=" relative">
              {params ? (
                <FormLabel className="text-gray-700 text-sm font-normal">
                  Edit size
                </FormLabel>
              ) : (
                <FormLabel className="text-gray-700 text-sm font-normal">
                  Add size
                </FormLabel>
              )}

              <FormControl>
                <Input
                  type="email"
                  placeholder="value"
                  {...field}
                  className=" placeholder:text-zinc-400 text-sm font-normal"
                />
              </FormControl>
              <FormMessage className=" absolute text-[11px] top-[62px] " />
            </FormItem>
          )}
        />
        <Button disabled={isLoading || EditIsloding} type="submit">
          {isLoading || EditIsloding ? (
            <RotateCw
              size={20}
              color="#ffffff"
              strokeWidth={1.5}
              absoluteStrokeWidth
              className="mr-4  animate-spin"
            />
          ) : null}
          Submit
        </Button>
      </form>
    </Form>
  );
}
