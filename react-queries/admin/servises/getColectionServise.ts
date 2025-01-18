import axios from 'axios';
import { TypeCollection } from '@/types/type_collection';

export const getCollectionServise = async (collectionId: string) => {
  console.log('restar getCollectionServise');
  const { data } = await axios.get<TypeCollection>(
    `/api/collection/${collectionId}`
  );
  return data;
};
