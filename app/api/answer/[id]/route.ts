import prismadb from '@/lib/prismadb';
import {
  AnswerDataType,
  AnswerValidator,
} from '../../../../validators/answer-validator';
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

    const body: AnswerDataType = await request.json();
    // валидация body при помощи zod
    const validation = AnswerValidator.safeParse(body);
    // console.log('validation:', validation);
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });

    // изменения значения в базе
    await prismadb.review.update({
      where: { id: params.id },
      data: { response: body.response },
    });
    return NextResponse.json({ message: 'Answer added' });
  } catch (error) {
    return NextResponse.json(error);
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
    await prismadb.review.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: 'Review removed' });
  } catch (error) {
    return NextResponse.json(error);
  }
}
