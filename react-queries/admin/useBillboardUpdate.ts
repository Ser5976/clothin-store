import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { updateBillboardServise } from './servises/updateBillboardServise';

export const useBillboardUpdate = (
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateBillboardServise,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['admin-billboard'] });
      toast.success(data.message);
      setIsOpen(false);
    },
    onError: (error: any) => {
      toast.error(error.response.data ?? 'Something went wrong');
    },
  });
};
