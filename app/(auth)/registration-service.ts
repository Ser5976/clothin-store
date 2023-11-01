import { toast } from 'react-toastify';
import axios from 'axios';
import { IResponseRegistration } from './types';
import { RegisterDataType } from '@/validators/register-validator';

export const registration = async (data: RegisterDataType) => {
  try {
    const response = await axios.post<IResponseRegistration>(
      '/api/register',
      data
    );

    toast.success(response.data.message);
    return response;
  } catch (error: any) {
    console.log('error:', error);
    if (error.response.status === 400) {
      toast.error(error.response.data);
    } else {
      toast.error('Something went wrong,try again');
    }
  }
};
