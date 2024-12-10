import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { postMaterialServise } from './servises/postMaterialServise';

export const useMaterialPost = (
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postMaterialServise,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['admin-material-search'] });
      toast.success(data.message);
      setIsOpen(false);
    },

    onError: (error: any) => {
      toast.error(error.response.data);
    },
  });
};
