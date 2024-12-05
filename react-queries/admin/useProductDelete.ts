import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { deleteProductServise } from './servises/deleteProductServise';

export const useProductDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteProductServise,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-product-search'] });
      toast.success('The product has been deleted');
    },
    onError: () => {
      toast.error('Something went wrong');
    },
  });
};
