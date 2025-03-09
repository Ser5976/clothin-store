import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { updateCustomersServise } from './servises/updateBillboardServise copy';

export const useCustomersUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCustomersServise,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['admin-customers', 'admin-customer'],
      });
      toast.success(data.message);
    },
    onError: (error: any) => {
      toast.error(error.response.data ?? 'Something went wrong');
    },
  });
};
