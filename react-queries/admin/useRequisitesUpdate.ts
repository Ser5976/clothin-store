import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { updateRequisitesServise } from './servises/updateRequisitesServise';

export const useRequisitesUpdate = (
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateRequisitesServise,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['admin-requisites'] });
      toast.success(data.message);
      setIsOpen(false);
    },
    onError: (error: any) => {
      toast.error(error.response.data ?? 'Something went wrong');
    },
  });
};
