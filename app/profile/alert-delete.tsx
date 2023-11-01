'use client';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';

import { XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

type AlertPropsType = {
  sizeId: string;
};

export function AlertDelete({ sizeId }: AlertPropsType) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async () => {
      // console.log('AlertProps:', sizeId);
      const response = await axios.delete(`/api/size/${sizeId}`);
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
      queryClient.invalidateQueries({
        queryKey: ['size'],
        exact: true,
      });
      router.refresh();
      return toast.success(data.message);
    },
  });

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <XCircle
          color="#17696A"
          strokeWidth={1}
          size={16}
          className=" absolute top-[5px] right-[3px] cursor-pointer"
        />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the size
            yore selected
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => mutate()}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
