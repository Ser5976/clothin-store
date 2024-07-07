import { SearchType } from './../../types/search_type';
import axios from 'axios';

export const getSerchServise = async (query: string) => {
  const { data } = await axios.get<SearchType[]>(`/api/search?query=${query}`);
  return data;
};
