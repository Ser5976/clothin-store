import prismadb from '@/lib/prismadb';
import {
  TypeDataType,
  TypeValidator,
} from '../../../../validators/type-validator ';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/config/auth_options';

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

    // удаление значения в базе
    await prismadb.type.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: 'Type removed' });
  } catch (error) {
    return NextResponse.json('The type is not remoed', { status: 500 });
  }
}
