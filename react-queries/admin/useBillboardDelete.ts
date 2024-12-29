import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { deleteBillboardServise } from './servises/deleteBillboardServise';

export const useBillboardDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteBillboardServise,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['admin-billboard'] });
      toast.success(data.data.message);
    },
    onError: (error: any) => {
      toast.error(error.response.data);
    },
  });
};
