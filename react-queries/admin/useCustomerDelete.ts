import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { deleteCustomerServise } from './servises/deleteCustomerServise';

export const useCustomerDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCustomerServise,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['admin-customers'] });
      toast.success(data.data.message);
    },
    onError: (error: any) => {
      toast.error(error.message);
    },
  });
};
