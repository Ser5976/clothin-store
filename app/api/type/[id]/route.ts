import prismadb from '@/lib/prismadb';
import {
  TypeDataType,
  TypeValidator,
} from '../../../../validators/type-validator ';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/config/auth_options';
import { CustomError } from '@/lib/utils';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json('Unauthorized', { status: 401 });
    }

    const body: TypeDataType = await request.json();
    // валидация body при помощи zod
    const validation = TypeValidator.safeParse(body);
    // console.log('validation:', validation);
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });

    // изменения значения в базе
    await prismadb.type.update({
      where: { id: params.id },
      data: { name: body.name },
    });
    return NextResponse.json({ message: 'Type changed' });
  } catch (error) {
    return NextResponse.json('Type is not changed', { status: 500 });
  }
}
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json('Unauthorized', { status: 401 });
    }
    //перед удалением уточняем , что этого типа нет в товарах
    const isType = await prismadb.product.findFirst({
      where: { typeId: params.id },
    });
    if (isType) {
      return NextResponse.json(
        'The type has not been deleted,delete all products that fall into this type',
        { status: 400 }
      );
    }
    if (!isType) {
      // удаление из категорий(т.к. у меня неявные отношения и не могу применить каскадное удаление,
      //приходиться костылить)
      const categories = await prismadb.category.findMany({
        where: {
          types: {
            some: { id: params.id }, // найти все Category, где существует связь с typeId
          },
        },
        select: { id: true }, // Получить только id категорий
      });
      //console.log('categories:', categories);
      // и само удаление, через цикл for of, т.к. в where можо указать только одно  значение
      //не нужно использовать  forEach, т.к он не ожидает выполнения async функций внутри своего тела.
      //Это означает, что обновления будут выполняться параллельно, но код не будет ждать их завершения,
      //что может привести к непредсказуемому поведению
      // for...of гарантирует последовательное выполнение async запросов:
      if (categories.length > 0) {
        for (const category of categories) {
          await prismadb.category.update({
            where: { id: category.id },
            data: {
              types: {
                disconnect: [{ id: params.id }], // Удалить связь с typeId
              },
            },
          });
        }
      }

      // второй способ, если вы хотите обновлять записи параллельно (для большей скорости), используйте Promise.all:
      // Этот подход безопасен для параллельного выполнения, поскольку он ожидает завершения всех обновлений
      //перед продолжением.
      /* await Promise.all(
        categories.map((category) =>
          prismadb.category.update({
            where: { id: category.id },
            data: {
              types: {
                disconnect: [{ id: params.id }], // Удалить связь с typeId
              },
            },
          })
        )
      ); */
      // третий способ, прямой SQL-запрос (самый быстрый),но нет проверки целостности данных
      //await prismadb.$executeRaw`DELETE FROM _CategoryToType WHERE B = ${params.id}`;

      //и  удаление значения в самой type
      await prismadb.type.delete({
        where: { id: params.id },
      });

      return NextResponse.json({ message: 'Type removed' });
    }
  } catch (error: any) {
    return NextResponse.json('The type is not remoed', { status: 500 });
  }
}
