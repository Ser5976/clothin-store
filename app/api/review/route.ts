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
    /*  const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json('Unauthorized', { status: 401 });
    } */
    const body: ReviewDataType = await request.json();
    // валидация body при помощи zod
    const validation = ReviewValidator.safeParse(body);
    // console.log('validation:', validation);
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });

    // сохранения значения в базе
    await prismadb.review.create({
      data: body,
    });
    return NextResponse.json({ message: 'Review is saved' });
  } catch (error) {
    return NextResponse.json('Review is not saved', { status: 500 });
  }
}
