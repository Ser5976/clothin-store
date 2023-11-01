import prismadb from '@/lib/prismadb';
import {
  MaterialDataType,
  MaterialValidator,
} from '../../../../validators/material-validator';
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

    const body: MaterialDataType = await request.json();
    // валидация body при помощи zod
    const validation = MaterialValidator.safeParse(body);
    // console.log('validation:', validation);
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });

    // изменения значения в базе
    await prismadb.material.update({
      where: { id: params.id },
      data: { name: body.name },
    });
    return NextResponse.json({ message: 'Material changed' });
  } catch (error) {
    return NextResponse.json('Material is not changed', { status: 500 });
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
    await prismadb.material.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: 'Material removed' });
  } catch (error) {
    return NextResponse.json('The material is not remoed', { status: 500 });
  }
}
