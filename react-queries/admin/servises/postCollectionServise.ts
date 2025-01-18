import { CollectionDataType } from '@/validators/collection-validator';
import axios from 'axios';

export const postCollectionServise = async (collection: CollectionDataType) => {
  const { data } = await axios.post<{ message: string }>(
    '/api/collection',
    collection
  );
  return data;
};
