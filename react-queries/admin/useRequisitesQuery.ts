import { getRequisitesServise } from './servises/getRequisitesServise';
import { useQuery } from '@tanstack/react-query';

export const useRequisitesQuery = () => {
  return useQuery({
    queryKey: ['admin-requisites'],
    queryFn: () => getRequisitesServise(),
  });
};
