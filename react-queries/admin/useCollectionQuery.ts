import { useQuery } from '@tanstack/react-query';
import { getCollectionServise } from './servises/getColectionServise';

export const useCollectionQuery = (collectionId: string) => {
  return useQuery({
    queryKey: ['admin-collection', collectionId],
    queryFn: () => getCollectionServise(collectionId),
  });
};
