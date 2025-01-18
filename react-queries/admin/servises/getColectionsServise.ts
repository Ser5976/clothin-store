import axios from 'axios';
import { TypeCollection } from '@/types/type_collection';

export const getCollectionsServise = async () => {
  const { data } = await axios.get<TypeCollection[]>('/api/collection');
  return data;
};
