import prismadb from '@/lib/prismadb';
import {
  PhoneDataType,
  PhoneValidator,
} from '../../../../validators/phone-validator';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/config/auth_options';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    /* const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json('Unauthorized', { status: 401 });
    } */

    const body: PhoneDataType = await request.json();
    // валидация body при помощи zod
    const validation = PhoneValidator.safeParse(body);
    // console.log('validation:', validation);
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });

    // изменения значения в базе
    await prismadb.phone.update({
      where: { id: params.id },
      data: body,
    });
    return NextResponse.json({ message: 'Phone changed' });
  } catch (error) {
    return NextResponse.json('Phone is not changed', { status: 500 });
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
    await prismadb.phone.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: 'Phone removed' });
  } catch (error) {
    return NextResponse.json('Phone is not remoed', { status: 500 });
  }
}
