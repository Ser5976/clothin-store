import { updateProductServise } from './servises/updateProductServise';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useProductUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateProductServise,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ['admin-product-search', 'admin-product'],
      });
      toast.success(data.message);
    },
    onError: (error: any) => {
      toast.error(error.response.data ?? 'Something went wrong');
    },
  });
};
