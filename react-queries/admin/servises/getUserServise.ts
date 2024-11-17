import { UserType } from '@/types/user_type';
import axios from 'axios';

export const getUserServise = async (query: string) => {
  const { data } = await axios.get<UserType[]>(`/api/user?query=${query}`);
  return data;
};
