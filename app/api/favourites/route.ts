import prismadb from '@/lib/prismadb';
import {
  FavoritesDataType,
  FavoritesValidator,
} from '../../../validators/favorites-validator';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/config/auth_options';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json('Unauthorized', { status: 401 });
    }
    const favourites = await prismadb.favorites.findMany({
      where: {
        userId: session.user.id,
      },
    });
    return NextResponse.json(favourites);
  } catch (error) {
    console.log(error);
    return NextResponse.json('Something went wrong', { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json('Unauthorized', { status: 401 });
    }
    const body: FavoritesDataType = await request.json();

    // валидация body при помощи zod
    const validation = FavoritesValidator.safeParse(body);
    // console.log('validation:', validation);
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });

    // если мы получаем массив productId,значить это данные из LocalStorage(от неавторизуемого пользователя)
    if (body.productIdArray) {
      const { productIdArray } = body;
      // получение текущего массива favourites
      const currentFavourites = await prismadb.favorites.findMany({
        where: { userId: session.user.id },
      });

      //удаление имеющихся и добавление отсутствующих productId
      // Удаление дубликатов из currentFavourites
      const uniqueFavourites = currentFavourites.filter(
        (obg) => !productIdArray.some((el) => el.productId === obg.id)
      );
      // Объединение уникальных значений из uniqueFavourites и получаемого массива productId
      const mergedProductId = [...uniqueFavourites, ...body.productIdArray].map(
        (obj) => {
          return { productId: obj.productId };
        }
      );
      // ну и обновление favorites моделе User в базе данных
      // сначала мы удаляем все зачения в массиве(они должны удалиться и в самой моделе Favorites)
      // а потом, записываем новые
      await prismadb.user.update({
        where: { id: session.user.id },
        data: {
          favorites: {
            deleteMany: {},
            create: mergedProductId,
          },
        },
      });
    }

    // ну а теперь если авторизованный пользователь добавляет или удаляет избранное
    if (body.productId) {
      // здесь мы работаем с моделью Favorites
      // сначала проверяем есть ли товар в модели
      const check = await prismadb.favorites.findFirst({
        where: {
          userId: session.user.id,
          productId: body.productId,
        },
      });
      // console.log('Check:', check);
      //если есть то удаляем
      if (check)
        await prismadb.favorites.deleteMany({
          where: { userId: session.user.id, productId: body.productId },
        });
      // если нет, то записываем
      if (!check)
        await prismadb.favorites.create({
          data: {
            userId: session.user.id,
            productId: body.productId,
          },
        });
    }

    return NextResponse.json({ message: 'Changed' });
  } catch (error) {
    return NextResponse.json(error);
  }
}
