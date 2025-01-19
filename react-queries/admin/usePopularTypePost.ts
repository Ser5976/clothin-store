import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { postPopularTypeServise } from './servises/postPopularTypeServise';

export const usePopularTypePost = (
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postPopularTypeServise,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['admin-popular-type'] });
      toast.success(data.message);
      setIsOpen(false);
    },

    onError: (error: any) => {
      toast.error(error.response.data);
    },
  });
};
