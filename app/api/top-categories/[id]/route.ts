import prismadb from '@/lib/prismadb';
import {
  TopCategoreisValidatorDataType,
  TopCategoriesValidator,
} from '../../../../validators/topCategories-validator';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/config/auth_options';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    /*  const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json('Unauthorized', { status: 401 });
    } */

    const body: TopCategoreisValidatorDataType = await request.json();
    // валидация body при помощи zod
    const validation = TopCategoriesValidator.safeParse(body);
    // console.log('validation:', validation);
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });
    console.log('id:', params.id);

    // изменения значения в базе
    await prismadb.topCategories.update({
      where: { id: params.id },
      data: {
        title: body.title,
        link: body.link,
        image: { update: body.image },
      },
    });
    return NextResponse.json({ message: 'TopCategories changed' });
  } catch (error) {
    console.log('Error:', error);
    return NextResponse.json('TopCategories is not changed', { status: 500 });
  }
}
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    /* const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json('Unauthorized', { status: 401 });
    } */

    // удаление значения в базе
    await prismadb.topCategories.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: 'TopCategories removed' });
  } catch (error) {
    return NextResponse.json('TopCategories is not remoed', { status: 500 });
  }
}
