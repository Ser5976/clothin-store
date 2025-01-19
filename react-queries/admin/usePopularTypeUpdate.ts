import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { updatePopularTypeServise } from './servises/updatePopularTypeServise';

export const usePopularTypeUpdate = (
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updatePopularTypeServise,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['admin-popular-type'] });
      toast.success(data.message);
      setIsOpen(false);
    },
    onError: (error: any) => {
      toast.error(error.response.data ?? 'Something went wrong');
    },
  });
};
