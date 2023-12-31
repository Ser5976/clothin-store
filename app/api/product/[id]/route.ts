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
    /* const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json('Unauthorized', { status: 401 });
    } */

    const body: ProductDataType = await request.json();
    // валидация body при помощи zod
    const validation = ProductValidator.safeParse(body);
    // console.log('validation:', validation);
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });
    //вычисление скидки
    let discount;
    if (body.oldPrice) {
      const result = ((body.oldPrice - body.price) / body.oldPrice) * 100;
      discount = parseFloat(result.toFixed(1));
    }

    // изменения значения в базе
    await prismadb.product.update({
      where: { id: params.id },
      data: {
        name: body.name,
        price: body.price,
        oldPrice: body.oldPrice,
        description: body.description,
        categoryId: body.categoryId,
        typeId: body.typeId,
        materialId: body.materialId,
        brandId: body.brandId,
        image: { create: body.image },
        sizes: {
          deleteMany: {},
          create: body.sizeId.map((item) => {
            return {
              assignedBy: body.name,
              assignedAt: new Date(),
              size: { connect: { id: item } },
            };
          }),
        },
        colors: {
          deleteMany: {},
          create: body.colorId.map((item) => {
            return {
              assignedBy: body.name,
              assignedAt: new Date(),
              color: { connect: { id: item } },
            };
          }),
        },

        discount: discount ?? null,
      },
    });
    return NextResponse.json({ message: 'Product changed' });
  } catch (error) {
    console.log('ERROR:', error);
    return NextResponse.json('Product is not changed', { status: 500 });
  }
}
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    /* const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json('Unauthorized', { status: 401 });
    } */

    // удаление товара
    await prismadb.product.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: 'Product removed' });
  } catch (error) {
    return NextResponse.json('The Product is not remoed', { status: 500 });
  }
}
