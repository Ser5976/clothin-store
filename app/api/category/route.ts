import prismadb from '@/lib/prismadb';
import {
  CategoryDataType,
  CategoryValidator,
} from '../../../validators/category-validator';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/config/auth_options';
import { CustomError } from '@/lib/utils';

export async function GET(request: Request) {
  try {
    const category = await prismadb.category.findMany({
      include: { types: true },
    });
    return NextResponse.json(category);
  } catch (error) {
    console.log(error);
    return NextResponse.json('Something went wrong', { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user.role !== 'ADMIN') {
      return NextResponse.json('Forbidden', { status: 403 });
    }
    const body: CategoryDataType = await request.json();
    // валидация body при помощи zod
    const validation = CategoryValidator.safeParse(body);
    // console.log('validation:', validation);
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });
    // проверка на существования такого же значения
    const candidate = await prismadb.category.findUnique({
      where: {
        name: body.name,
      },
    });
    if (candidate) {
      return NextResponse.json('This category already exist', { status: 400 });
    }
    // проверка на количество категорий(создавать будем не больше 4-х)
    const numberCategories = await prismadb.category.count();
    if (numberCategories === 4) {
      //пример кастомного класса ошибки(сделал ради учёбы,
      //потому что NextResponse.json('', { status: }), проще )
      throw new CustomError(
        'You can create no more than 4 categories',
        400,
        'numberCategories'
      );
    }
    // сохранения значения в базе
    await prismadb.category.create({
      data: body,
    });
    return NextResponse.json({ message: 'Data is saved' });
  } catch (error: any) {
    if (error?.details === 'numberCategories') {
      return NextResponse.json(error.message, { status: error.code });
    }
    return NextResponse.json('Data is not saved', { status: 500 });
  }
}
