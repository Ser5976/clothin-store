import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { deleteCollectionItemServise } from './servises/deleteCollectionItemServise';

export const useColectionItemDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteCollectionItemServise,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['admin-collection'] });
      toast.success(data.data.message);
    },
    onError: (error: any) => {
      toast.error(error.response.data);
    },
  });
};
