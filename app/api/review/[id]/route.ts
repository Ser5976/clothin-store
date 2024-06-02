import { SortReviewValidator } from './../../../../validators/sort-review-validator';
import prismadb from '@/lib/prismadb';
import {
  ReviewUpdateDataType,
  ReviewUpdateValidator,
} from '../../../../validators/reviewUpdate-validator';
import { NextResponse } from 'next/server';
import { SortReviewDataType } from '@/validators/sort-review-validator';

//Здесь мы получаем отзывы при помощи POST т.к. передаём объкт сортировки не через query параметры,а через body
export async function POST(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body: SortReviewDataType = await request.json();
    // валидация body при помощи zod
    const validation = SortReviewValidator.safeParse(body);
    // console.log('validation:', validation);
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });

    //пагинация
    const page = body.page || 1;
    const limit = 2;
    const offset = page * limit - limit;
    // получает количество для пагинации
    const count = await prismadb.review.count({
      where: { productId: params.id },
    });
    //рассчёт количества страниц,для пагинации
    const pageQty = Math.ceil(count / limit);

    const reviews = await prismadb.review.findMany({
      skip: offset,
      take: limit,
      where: { productId: params.id },
      orderBy: body.oldest
        ? { createdAt: 'asc' }
        : body.rating
        ? { estimation: 'desc' }
        : body.reset
        ? { createdAt: 'desc' }
        : { createdAt: 'desc' },
      // оператор include показывает вложенную запись
      include: {
        likeReview: true,
        dislikeReview: true,
      },
    });
    return NextResponse.json({ reviews, count, pageQty });
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
