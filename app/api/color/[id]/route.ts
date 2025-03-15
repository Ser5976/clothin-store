import prismadb from '@/lib/prismadb';
import {
  ColorDataType,
  ColorValidator,
} from '../../../../validators/color-validator';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/config/auth_options';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user.role !== 'ADMIN') {
      return NextResponse.json('Forbidden', { status: 403 });
    }

    const body: ColorDataType = await request.json();
    // валидация body при помощи zod
    const validation = ColorValidator.safeParse(body);
    // console.log('validation:', validation);
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });

    // изменения значения в базе
    await prismadb.color.update({
      where: { id: params.id },
      data: body,
    });
    return NextResponse.json({ message: 'Color changed' });
  } catch (error) {
    return NextResponse.json('The color is not changed', { status: 500 });
  }
}
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user.role !== 'ADMIN') {
      return NextResponse.json('Forbidden', { status: 403 });
    }
    //перед удалением уточняем , что этого цвета нет в товарах
    const isColor = await prismadb.product.findFirst({
      where: {
        colors: {
          some: { colorId: params.id },
        },
      },
    });
    if (isColor) {
      return NextResponse.json(
        'The color has not been deleted,delete all products that fall into this color',
        { status: 400 }
      );
    }
    if (!isColor) {
      // удаление значения в базе(в отличии от отношений type и category, здесь отношения модели color с моделью products
      // явные , поэтому можно воспользоваться каскадным удалением)
      await prismadb.color.delete({
        where: { id: params.id },
      });
      return NextResponse.json({ message: 'Color removed' });
    }
  } catch (error) {
    return NextResponse.json('The color is not remoed', { status: 500 });
  }
}
