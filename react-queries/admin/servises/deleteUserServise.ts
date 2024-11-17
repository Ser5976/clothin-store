import axios from 'axios';

export const deleteUserServise = async (userId: string) => {
  await axios.delete(`/api/user/${userId}`);
};
