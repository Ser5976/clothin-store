import prismadb from '@/lib/prismadb';
import {
  SizeDataType,
  SizeValidator,
} from '../../../../validators/size-validator';
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

    const body: SizeDataType = await request.json();
    // валидация body при помощи zod
    const validation = SizeValidator.safeParse(body);
    // console.log('validation:', validation);
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });

    // изменения значения в базе
    await prismadb.size.update({
      where: { id: params.id },
      data: { value: body.value },
    });
    return NextResponse.json({ message: 'Size changed' });
  } catch (error) {
    return NextResponse.json('Size is not changed', { status: 500 });
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
    await prismadb.size.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: 'Size removed' });
  } catch (error) {
    return NextResponse.json('The size is not remoed', { status: 500 });
  }
}
