import prismadb from '@/lib/prismadb';
import {
  VoteReviewDataType,
  VoteReviewValidator,
} from '@/validators/vote-review-validator';

import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/config/auth_options';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json('Unauthorized', { status: 401 });
    }
    const body: VoteReviewDataType = await request.json();

    // валидация body при помощи zod
    const validation = VoteReviewValidator.safeParse(body);
    // console.log('validation:', validation);
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });

    // сначала  проверяем есть ли дизлай  этому отзыву
    const checkDisLike = await prismadb.dislikeReview.findFirst({
      where: {
        userId: session.user.id,
        reviewId: body.reviewId,
      },
    });

    //если есть в дислайках то удаляем
    if (checkDisLike)
      await prismadb.dislikeReview.deleteMany({
        where: { userId: session.user.id, reviewId: body.reviewId },
      });

    // дальше проверяем есть ли лай этому отзыву
    const checkLike = await prismadb.likeReview.findFirst({
      where: {
        userId: session.user.id,
        reviewId: body.reviewId,
      },
    });

    //если есть то удаляем
    if (checkLike)
      await prismadb.likeReview.deleteMany({
        where: { userId: session.user.id, reviewId: body.reviewId },
      });
    // если нет, то записываем
    if (!checkLike)
      await prismadb.likeReview.create({
        data: {
          userId: session.user.id,
          reviewId: body.reviewId,
        },
      });

    return NextResponse.json('like changed');
  } catch (error) {
    return NextResponse.json(error);
  }
}
