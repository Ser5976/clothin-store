import prismadb from '@/lib/prismadb';
import {
  CategoryDataType,
  CategoryValidator,
} from '../../../../validators/category-validator';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/config/auth_options';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    /*  const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json('Unauthorized', { status: 401 });
    } */

    const body: CategoryDataType = await request.json();
    // валидация body при помощи zod
    const validation = CategoryValidator.safeParse(body);
    // console.log('validation:', validation);
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });

    // изменения значения в базе
    await prismadb.category.update({
      where: { id: params.id },
      data: { name: body.name },
    });
    return NextResponse.json({ message: 'Category changed' });
  } catch (error) {
    return NextResponse.json('Category is not changed', { status: 500 });
  }
}
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json('Unauthorized', { status: 401 });
    }
    //перед удалением уточняем , что ни один товар не входит в эту категорию
    const isCategory = await prismadb.product.findFirst({
      where: { categoryId: params.id },
    });
    if (isCategory) {
      return NextResponse.json(
        'The category has not been deleted,delete all products that fall into this category',
        { status: 400 }
      );
    }
    if (!isCategory) {
      // удаление значения в базе
      await prismadb.category.delete({
        where: { id: params.id },
      });
      return NextResponse.json({ message: 'Category removed' });
    }
  } catch (error) {
    return NextResponse.json('The category is not remoed', { status: 500 });
  }
}
