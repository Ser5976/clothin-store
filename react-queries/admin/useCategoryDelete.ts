import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { deleteCategoryServise } from './servises/deleteCategoyServise';

export const useCategoryDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCategoryServise,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['admin-category'] });
      toast.success(data.data.message);
    },
    onError: (error: any) => {
      toast.error(error.response.data);
    },
  });
};
