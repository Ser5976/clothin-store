import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { postCustomersServise } from './servises/postBillboardServise copy';

export const useCustomersPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postCustomersServise,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['admin-customers'] });
      toast.success(data.message);
    },

    onError: (error: any) => {
      toast.error(error.response.data);
    },
  });
};
