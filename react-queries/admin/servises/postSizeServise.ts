import axios from 'axios';

export const postSizeServise = async (sizeValue: { value: string }) => {
  const { data } = await axios.post<{ message: string }>(
    '/api/size',
    sizeValue
  );
  return data;
};
