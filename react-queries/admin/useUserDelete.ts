import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { deleteUserServise } from './servises/deleteUserServise';

export const useUserDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUserServise,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-search'] });
      toast.success('The user has been deleted');
    },
    onError: () => {
      toast.error('Something went wrong');
    },
  });
};
