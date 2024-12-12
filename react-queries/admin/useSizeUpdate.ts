import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { updateSizeServise } from './servises/updateSizeServise';

export const useSizeUpdate = (
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateSizeServise,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['admin-size'] });
      toast.success(data.message);
      setIsOpen(false);
    },
    onError: (error: any) => {
      toast.error(error.response.data ?? 'Something went wrong');
    },
  });
};
