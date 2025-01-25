import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { deleteStoreReviewServise } from './servises/deleteStoreReviewServise';

export const useStoreReviewDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteStoreReviewServise,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['store-review'] });
      toast.success(data.data.message);
    },
    onError: (error: any) => {
      toast.error(error.response.data);
    },
  });
};
