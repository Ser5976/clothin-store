import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { deleteRequisitesServise } from './servises/deleteRequisitesServise';

export const useRequisitesDelete = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteRequisitesServise,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['admin-requisites'] });
      toast.success(data.data.message);
    },
    onError: (error: any) => {
      toast.error(error.response.data);
    },
  });
};
