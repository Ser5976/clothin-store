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
    await prismadb.estimation.upsert({
      where: { userId: body.userId, productId: body.productId },
      update: { value: body.value },
      create: {
        value: body.value,
        productId: body.productId,
        userId: body.userId,
      },
    });
    // получаем количество оценок выбранного продукта
    const count = await prismadb.estimation.count({
      where: { productId: body.productId },
    });
    // вычисляем среднюю оценку
    const {
      _avg: { value },
    } = await prismadb.estimation.aggregate({
      _avg: { value: true },
    });
    const avg = value ?? 1;
    // console.log('AVG:', value);
    // ну и наконец записываем или изменяем рейтинг выбранного продукта
    await prismadb.rating.upsert({
      where: { productId: body.productId },
      update: { value: avg, count },
      create: { value: avg, count, productId: body.productId },
    });

    return NextResponse.json({ message: 'Rating is changed' });
  } catch (error) {
    return NextResponse.json('Rating is not changed', { status: 500 });
  }
}
