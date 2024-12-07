import { postCategoryServise } from './servises/postCategoryServise';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { postTypeServise } from './servises/postTypeServise';

export const useTypePost = (
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postTypeServise,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['admin-type-search'] });
      toast.success(data.message);
      setIsOpen(false);
    },

    onError: (error: any) => {
      toast.error(error.response.data);
    },
  });
};
