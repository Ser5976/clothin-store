import prismadb from '@/lib/prismadb';
import {
  CategoryDataType,
  CategoryValidator,
} from '../../../validators/category-validator';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/config/auth_options';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json('Unauthorized', { status: 401 });
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
    // сохранения значения в базе
    await prismadb.category.create({
      data: body,
    });
    return NextResponse.json({ message: 'Data is saved' });
  } catch (error) {
    return NextResponse.json('Data is not saved', { status: 500 });
  }
}
