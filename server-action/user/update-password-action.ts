'use server';
import { authOptions } from '@/app/api/auth/config/auth_options';
import { getServerSession } from 'next-auth';
import prismadb from '@/lib/prismadb';
import { revalidateTag } from 'next/cache';
import { PersonalPasswordFormType } from '@/validators/personal-password-form-validator';
import { compare, genSalt, hash } from 'bcryptjs';

export const updatePasswordAction = async ({
  currentPassword,
  newPassword,
}: PersonalPasswordFormType) => {
  try {
    const session = await getServerSession(authOptions);
    console.log('session from server action:', session);
    if (!session?.user) {
      throw new Error('Unauthorized');
    }
    //проверка пароля ли user  с таким email
    const user = await prismadb.user.findUnique({
      where: {
        id: session.user.id,
      },
    });
    if (!user?.password) throw new Error();
    //проверка пароля
    const validPassword = await compare(currentPassword, user.password);
    if (!validPassword) return { error: 'the password is incorrect' };
    //меняем у пользователя пароль
    const salt = await genSalt(7);
    const password = await hash(newPassword, salt);
    await prismadb.user.update({
      where: { id: session?.user.id },
      data: { password },
    });
    revalidateTag('user');
    return { success: 'Your password has been changet' };
  } catch (error) {
    console.log(error);
    throw new Error('Something went wrong');
  }
};
