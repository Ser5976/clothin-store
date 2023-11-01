import prismadb from '@/lib/prismadb';
import {
  FavoritesDataType,
  FavoritesValidator,
} from '../../../validators/favorites-validator';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/config/auth_options';

export async function POST(request: Request) {
  try {
    /*  const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json('Unauthorized', { status: 401 });
    } */
    const body: FavoritesDataType = await request.json();
    console.log('BodyRating:', body);
    // валидация body при помощи zod
    const validation = FavoritesValidator.safeParse(body);
    // console.log('validation:', validation);
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });
    // делаем проверку есть ли выбранный пользователем товар в избанном
    const check = await prismadb.favorites.findFirst({
      where: {
        userId: body.userId,
        productId: body.productId,
      },
    });
    console.log('Check:', check);
    //если есть то удаляем
    if (check)
      await prismadb.favorites.deleteMany({
        where: { userId: body.userId, productId: body.productId },
      });
    // если нет, то записываем
    if (!check)
      await prismadb.favorites.create({
        data: {
          userId: body.userId,
          productId: body.productId,
        },
      });

    return NextResponse.json(
      check
        ? { message: 'Removed from favorites ' }
        : { message: 'Added to favorites ' }
    );
  } catch (error) {
    return NextResponse.json(error);
  }
}
