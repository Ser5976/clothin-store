import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { updateCollectionServise } from './servises/updateCollectionServise';

export const useCollectionUpdate = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateCollectionServise,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['admin-collection'] });
      toast.success(data.message);
    },
    onError: (error: any) => {
      toast.error(error.response.data ?? 'Something went wrong');
    },
  });
};
