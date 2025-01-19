import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { deletePopularTypeServise } from './servises/deletePopularTypeServise';

export const usePopularTypeDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePopularTypeServise,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['admin-popular-type'] });
      toast.success(data.data.message);
    },
    onError: (error: any) => {
      toast.error(error.response.data);
    },
  });
};
