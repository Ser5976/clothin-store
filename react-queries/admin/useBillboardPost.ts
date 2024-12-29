import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { postBillboardServise } from './servises/postBillboardServise';

export const useBillboardPost = (
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postBillboardServise,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['admin-billboard'] });
      toast.success(data.message);
      setIsOpen(false);
    },

    onError: (error: any) => {
      toast.error(error.response.data);
    },
  });
};
