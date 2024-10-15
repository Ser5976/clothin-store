'use server';
import { authOptions } from '@/app/api/auth/config/auth_options';
import { getServerSession } from 'next-auth';
import prismadb from '@/lib/prismadb';
import { revalidateTag } from 'next/cache';
import { deleteImg } from '@/utils/utapi-delete';

export const deleteAvatarAction = async ({
  currentAvatar,
}: {
  currentAvatar: string | undefined;
}) => {
  try {
    const session = await getServerSession(authOptions);
    // console.log('session from server action:', session);
    if (!session?.user) {
      throw new Error('Unauthorized');
    }
    // удаление предыдущей картинки из uploadthing
    if (currentAvatar) {
      // сначало нужно проверить картинка у нас из uploadthing или нет
      const isUploadthing =
        currentAvatar.substring(0, currentAvatar.lastIndexOf('/')) ===
        'https://utfs.io/f';
      //если да то удаляем
      if (isUploadthing) {
        // получаем fileKey
        const fileKey = currentAvatar.substring(
          currentAvatar.lastIndexOf('/') + 1
        );
        await deleteImg(fileKey);
      }
    }

    await prismadb.user.update({
      where: { id: session?.user.id },
      data: { image: null },
    });
    revalidateTag('user');
  } catch (error) {
    console.log(error);
    throw new Error('Something went wrong');
  }
};
