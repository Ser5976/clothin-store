import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { deleteCollectionServise } from './servises/deleteCollectionServise';

export const useCollectionDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCollectionServise,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['admin-collections'] });
      toast.success(data.data.message);
    },
    onError: (error: any) => {
      toast.error(error.response.data);
    },
  });
};
