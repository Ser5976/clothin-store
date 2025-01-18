import axios from 'axios';

export const deleteCollectionServise = async (collectionId: string) => {
  const data = await axios.delete(`/api/collection/${collectionId}`);
  return data;
};
