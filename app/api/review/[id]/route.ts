import prismadb from '@/lib/prismadb';
import {
  ReviewUpdateDataType,
  ReviewUpdateValidator,
} from '../../../../validators/reviewUpdate-validator';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/config/auth_options';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const reviews = await prismadb.review.findMany({
      where: { productId: params.id },
    });
    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json('Reviews is dont received', { status: 500 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    /* const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json('Unauthorized', { status: 401 });
    } */

    const body: ReviewUpdateDataType = await request.json();
    // валидация body при помощи zod
    const validation = ReviewUpdateValidator.safeParse(body);
    // console.log('validation:', validation);
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });

    // изменения значения в базе
    await prismadb.review.update({
      where: { id: params.id },
      data: { content: body.content },
    });
    return NextResponse.json({ message: 'Review changed' });
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
