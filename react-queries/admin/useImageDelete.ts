import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { deleteImageServise } from './servises/deleteImageServise';
import { deleteProductServise } from './servises/deleteProductServise';

export const useImageDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteImageServise,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-product-search'] });
      toast.success('The image has been deleted');
    },
    onError: () => {
      toast.error('Something went wrong');
    },
  });
};
