import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { postRequisitesServise } from './servises/postRequisitesServise';

export const useRequisitesPost = (
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postRequisitesServise,

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['admin-requisites'] });
      toast.success(data.message);
      setIsOpen(false);
    },

    onError: (error: any) => {
      toast.error(error.response.data);
    },
  });
};
