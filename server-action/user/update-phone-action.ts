'use server';
import { authOptions } from '@/app/api/auth/config/auth_options';
import { getServerSession } from 'next-auth';
import prismadb from '@/lib/prismadb';
import { revalidateTag } from 'next/cache';
import { PersonalPhoneFormType } from '@/validators/personal-phone-form-validator';

export const updatePhoneAction = async ({ phone }: PersonalPhoneFormType) => {
  try {
    const session = await getServerSession(authOptions);
    // console.log('session from server action:', session);
    if (!session?.user) {
      throw new Error('Unauthorized');
    }
    await prismadb.user.update({
      where: { id: session?.user.id },
      data: { phone },
    });
    revalidateTag('user');
  } catch (error) {
    console.log(error);
    throw new Error('Something went wrong');
  }
};
