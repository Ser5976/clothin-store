import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { deleteMaterialServise } from './servises/deleteMaterialServise';

export const useMaterialDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMaterialServise,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['admin-material-search'] });
      toast.success(data.data.message);
    },
    onError: (error: any) => {
      toast.error(error.response.data);
    },
  });
};
