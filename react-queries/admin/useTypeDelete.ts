import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { deleteTypeServise } from './servises/deleteTypeServise';

export const useTypeDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteTypeServise,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['admin-type-search'] });
      toast.success(data.data.message);
    },
    onError: (error: any) => {
      toast.error(error.response.data);
    },
  });
};
