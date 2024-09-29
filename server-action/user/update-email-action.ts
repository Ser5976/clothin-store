'use server';
import { authOptions } from '@/app/api/auth/config/auth_options';
import { getServerSession } from 'next-auth';
import prismadb from '@/lib/prismadb';
import { revalidateTag } from 'next/cache';
import { PersonalEmailFormType } from '@/validators/personal-email-form-validator';

export const updateEmailAction = async ({ email }: PersonalEmailFormType) => {
  try {
    const session = await getServerSession(authOptions);
    console.log('session from server action:', session);
    if (!session?.user) {
      throw new Error('Unauthorized');
    }
    //проверка существует ли user  с таким email
    const user = await prismadb.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      return { error: 'Such an email alredy exists' };
    }
    await prismadb.user.update({
      where: { id: session?.user.id },
      data: { email },
    });
    revalidateTag('user');
    return { success: 'Your email has been changet' };
  } catch (error) {
    console.log(error);
    throw new Error('Something went wrong');
  }
};
