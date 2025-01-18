import { CollectionDataType } from '@/validators/collection-validator';
import axios from 'axios';

export const updateCollectionServise = async (dataCollection: {
  id: string;
  collection: CollectionDataType;
}) => {
  const { data } = await axios.put<{ message: string }>(
    `/api/collection/${dataCollection.id}`,
    dataCollection.collection
  );
  return data;
};
