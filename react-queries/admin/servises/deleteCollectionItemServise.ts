import axios from 'axios';

export const deleteCollectionItemServise = async (collectionItemId: string) => {
  const data = await axios.delete(`/api/collection-item/${collectionItemId}`);
  return data;
};
