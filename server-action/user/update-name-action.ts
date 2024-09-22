'use server';
import { PersonalNameFormType } from './../../validators/personal-name-form-validator';
import { authOptions } from '@/app/api/auth/config/auth_options';
import { getServerSession } from 'next-auth';
import prismadb from '@/lib/prismadb';
import { revalidateTag } from 'next/cache';

export const updateNameAction = async ({ name }: PersonalNameFormType) => {
  try {
    const session = await getServerSession(authOptions);
    // console.log('session from server action:', session);
    if (!session?.user) {
      throw new Error('Unauthorized');
    }
    await prismadb.user.update({
      where: { id: session?.user.id },
      data: { name },
    });
    revalidateTag('user');
  } catch (error) {
    console.log(error);
    throw new Error('Failed to update name');
  }
};
