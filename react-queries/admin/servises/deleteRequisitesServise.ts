import axios from 'axios';

export const deleteRequisitesServise = async (requisitisId: string) => {
  const data = await axios.delete(`/api/requisites/${requisitisId}`);
  return data;
};
