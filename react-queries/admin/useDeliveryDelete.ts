import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { deleteDeliveryServise } from './servises/deleteDeliveryServise';

export const useDeliveryDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteDeliveryServise,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['admin-delivery'] });
      toast.success(data.data.message);
    },
    onError: (error: any) => {
      toast.error(error.response.data);
    },
  });
};
