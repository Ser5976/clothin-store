import prismadb from '@/lib/prismadb';
import {
  ProductDataType,
  ProductValidator,
} from '../../../../validators/product-validator ';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/config/auth_options';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json('Unauthorized', { status: 401 });
    }

    const body: ProductDataType = await request.json();
    // валидация body при помощи zod
    const validation = ProductValidator.safeParse(body);
    // console.log('validation:', validation);
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });

    // изменения значения в базе
    await prismadb.product.update({
      where: { id: params.id },
      data: {
        name: body.name,
        price: body.price,
        description: body.description,
        categoryId: body.categoryId,
        typeId: body.typeId,
        materialId: body.materialId,
        brandId: body.brandId,
        image: { create: body.image },
        sizeId: body.sizeId,
        colorId: body.colorId,
      },
    });
    return NextResponse.json({ message: 'Product changed' });
  } catch (error) {
    return NextResponse.json('Brand is not changed', { status: 500 });
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

    // удаление товара
    await prismadb.product.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: 'Product removed' });
  } catch (error) {
    return NextResponse.json('The Product is not remoed', { status: 500 });
  }
}
