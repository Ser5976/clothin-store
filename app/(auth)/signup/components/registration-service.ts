import { toast } from 'react-toastify';
import axios from 'axios';
import { IRegistration, IResponseRegistration } from './types';

export const registration = async (data: IRegistration) => {
  try {
    const response = await axios.post<IResponseRegistration>(
      '/api/register',
      data
    );

    toast.success(response.data.message);
    return response;
  } catch (error: any) {
    if (error.response.status === 400) {
      toast.error('A user with such an email already exist');
    } else {
      toast.error('Something went wrong,try again');
    }
  }
};
