import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { postDeliveryServise } from './servises/postDeliveryServise';

export const useDeliveryPost = (
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postDeliveryServise,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['admin-delivery'] });
      toast.success(data.message);
      setIsOpen(false);
    },

    onError: (error: any) => {
      toast.error(error.response.data);
    },
  });
};
