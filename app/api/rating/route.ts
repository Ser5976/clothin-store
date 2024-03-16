import prismadb from '@/lib/prismadb';
import {
  EstimationDataType,
  EstimationValidator,
} from '../../../validators/estimation-validator';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/config/auth_options';

export async function PUT(request: Request) {
  try {
    /*  const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json('Unauthorized', { status: 401 });
    } */
    const body: EstimationDataType = await request.json();
    // console.log('BodyRating:', body);
    // валидация body при помощи zod
    const validation = EstimationValidator.safeParse(body);
    // console.log('validation:', validation);
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });
    // изменяем(если уже есть оценка) или создаём оценку(если нет)
    const candidate = await prismadb.estimation.findFirst({
      where: { userId: body.userId, productId: body.productId },
    });
    if (candidate) {
      await prismadb.estimation.update({
        where: { id: candidate.id },
        data: { value: body.value },
      });
    } else {
      await prismadb.estimation.create({
        data: {
          value: body.value,
          productId: body.productId,
          userId: body.userId,
        },
      });
    }

    //если есть отзыв по этому товару,то добавляем в отзыв оценку
    const reviewProduct = await prismadb.review.findFirst({
      where: {
        userId: body.userId,
        productId: body.productId,
      },
    });
    if (reviewProduct)
      await prismadb.review.update({
        where: { id: reviewProduct.id },
        data: { estimation: body.value },
      });
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

    return NextResponse.json({ message: 'Rating is changed' });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
