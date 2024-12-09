import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { deleteBrandServise } from './servises/deleteTypeServise copy';

export const useBrandDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBrandServise,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['admin-brand-search'] });
      toast.success(data.data.message);
    },
    onError: (error: any) => {
      toast.error(error.response.data);
    },
  });
};
