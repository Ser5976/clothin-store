import prismadb from '@/lib/prismadb';
import {
  BillboardDataType,
  BillboardValidator,
} from '../../../../validators/billboard-validator ';
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

    const body: BillboardDataType = await request.json();

    // валидация body при помощи zod
    const validation = BillboardValidator.safeParse(body);
    // console.log('validation:', validation);
    if (!validation.success)
      return NextResponse.json('Uncorrected data', { status: 400 });

    // изменения значения в базе

    await prismadb.billboard.update({
      where: { id: params.id },
      data: {
        title: body.title,
        subTitle: body.subTitle,
        link: body.link,
        image: { update: body.image },
      },
    });

    return NextResponse.json({ message: 'Billboard changed' });
  } catch (error) {
    return NextResponse.json('Billboard is not changed', { status: 500 });
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

    // удаление значения в базе
    await prismadb.billboard.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: 'Bllboard removed' });
  } catch (error) {
    return NextResponse.json('Billboard is not remoed', { status: 500 });
  }
}
