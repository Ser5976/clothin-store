import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { deleteSizeServise } from './servises/deleteSizeServise';

export const useSizeDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteSizeServise,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['admin-size'] });
      toast.success(data.data.message);
    },
    onError: (error: any) => {
      toast.error(error.response.data);
    },
  });
};
