import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { updateTypeServise } from './servises/updateTypeServise';

export const useTypeUpdate = (
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateTypeServise,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['admin-type-search'] });
      toast.success(data.message);
      setIsOpen(false);
    },
    onError: (error: any) => {
      toast.error(error.response.data ?? 'Something went wrong');
    },
  });
};
