import prismadb from '@/lib/prismadb';
import {
  StoreReviewDataType,
  StoreReviewValidator,
} from '../../../validators/store-review-validator';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/config/auth_options';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    //пагинация
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 3;
    const offset = page * limit - limit;
    // получает количество для пагинации
    const count = await prismadb.storeReviews.count();
    //рассчёт количества страниц,для пагинации
    const pageQty = Math.ceil(count / limit);

    const storeReviews = await prismadb.storeReviews.findMany({
      skip: offset,
      take: limit,
      include: {
        user: { select: { email: true, name: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json({ count, storeReviews, pageQty });
  } catch (error) {
    console.log(error);
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json('Unauthorized', { status: 401 });
    }
    const body: StoreReviewDataType = await request.json();
    // console.log('store-reviews:', body);
    // валидация body при помощи zod
    const validation = StoreReviewValidator.safeParse(body);
    // console.log('validation:', validation);
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });

    // сохранения значения в базе
    await prismadb.storeReviews.create({
      data: { ...body, userId: session.user.id },
    });
    return NextResponse.json({ message: 'Review is saved' });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
