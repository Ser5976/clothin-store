import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { postSizeServise } from './servises/postSizeServise';

export const useSizePost = (
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postSizeServise,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['admin-size'] });
      toast.success(data.message);
      setIsOpen(false);
    },

    onError: (error: any) => {
      toast.error(error.response.data);
    },
  });
};
