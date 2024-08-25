import prismadb from '@/lib/prismadb';

import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@/app/api/auth/config/auth_options';
import {
  PopularTypesValidator,
  PopularTypesValidatorDataType,
} from '@/validators/popular-types-validator';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    /* const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json('Unauthorized', { status: 401 });
    } */

    const body: PopularTypesValidatorDataType = await request.json();
    // валидация body при помощи zod
    const validation = PopularTypesValidator.safeParse(body);
    // console.log('validation:', validation);
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });
    console.log('id:', params.id);

    // изменения значения в базе
    await prismadb.popularTypes.update({
      where: { id: params.id },
      data: {
        title: body.title,
        link: body.link,
        image: {
          delete: {},
          create: body.image,
        },
      },
    });
    return NextResponse.json({ message: 'PopularTypes changed' });
  } catch (error) {
    console.log('Error:', error);
    return NextResponse.json('PopularTypes is not changed', { status: 500 });
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
    await prismadb.popularTypes.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: 'PopularTypes removed' });
  } catch (error) {
    return NextResponse.json('PopularTypes is not remoed', { status: 500 });
  }
}
