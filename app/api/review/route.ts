import prismadb from '@/lib/prismadb';
import {
  ReviewDataType,
  ReviewValidator,
} from '../../../validators/review-validator';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/config/auth_options';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    console.log('review-session:', session?.user.role);
    if (!session?.user) {
      return NextResponse.json('Unauthorized', { status: 401 });
    }
    const body: ReviewDataType = await request.json();
    // валидация body при помощи zod
    const validation = ReviewValidator.safeParse(body);
    // console.log('validation:', validation);
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });

    // сохранения отзыва в базе
    await prismadb.review.create({
      data: {
        ...body,
        estimation: Number(body.estimation),
        userId: session.user.id,
      },
    });

    // дальше  работаем с моделью estimation и rating
    // изменяем(если уже есть оценка) или создаём оценку(если нет)
    const candidate = await prismadb.estimation.findFirst({
      where: { userId: session.user.id, productId: body.productId },
    });
    if (candidate) {
      await prismadb.estimation.update({
        where: { id: candidate.id },
        data: { value: Number(body.estimation) },
      });
    } else {
      await prismadb.estimation.create({
        data: {
          value: Number(body.estimation),
          productId: body.productId,
          userId: session.user.id,
        },
      });
    }

    // получаем количество оценок выбранного товара
    const count = await prismadb.estimation.count({
      where: { productId: body.productId },
    });
    // вычисляем среднюю оценку
    const {
      _avg: { value },
    } = await prismadb.estimation.aggregate({
      _avg: { value: true },
      where: { productId: body.productId },
    });
    const avg = value ?? 1;
    // console.log('AVG:', value);
    // ну и наконец записываем или изменяем рейтинг выбранного продукта
    await prismadb.rating.upsert({
      where: { productId: body.productId },
      update: { value: parseFloat(avg.toFixed(1)), count },
      create: {
        value: parseFloat(avg.toFixed(1)),
        count,
        productId: body.productId,
      },
    });
    return NextResponse.json({ message: 'Review is saved' });
  } catch (error) {
    return NextResponse.json('Review is not saved', { status: 500 });
  }
}
