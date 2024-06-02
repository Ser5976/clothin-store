import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { postOrderServise } from './servises/postOrderServise';

export const useOrderPost = () => {
  return useMutation({
    mutationFn: postOrderServise,
    onError: () => {
      toast.error('Something went wrong');
    },
  });
};
