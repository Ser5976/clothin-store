import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { postProductServise } from './servises/postProductServise';

export const useProductPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postProductServise,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['admin-product-search'] });
      toast.success(data.message);
    },

    onError: (error: any) => {
      toast.error(error.response.data);
    },
  });
};
