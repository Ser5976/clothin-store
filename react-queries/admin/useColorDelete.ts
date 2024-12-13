import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { deleteColorServise } from './servises/deleteColorServise';

export const useColorDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteColorServise,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['admin-color'] });
      toast.success(data.data.message);
    },
    onError: (error: any) => {
      toast.error(error.response.data);
    },
  });
};
