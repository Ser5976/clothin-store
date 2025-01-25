import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { updateStoreReviewServise } from './servises/updateStoreReviewServise';

export const useStoreReviewUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateStoreReviewServise,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['store-review'] });
      toast.success(data.message);
    },
    onError: (error: any) => {
      toast.error(error.response.data ?? 'Something went wrong');
    },
  });
};
