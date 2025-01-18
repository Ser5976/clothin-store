import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { postCollectionServise } from './servises/postCollectionServise';

export const useCollectionPost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postCollectionServise,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['admin-collections'] });
      toast.success(data.message);
    },

    onError: (error: any) => {
      toast.error(error.response.data);
    },
  });
};
