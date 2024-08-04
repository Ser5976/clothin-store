import prismadb from '@/lib/prismadb';
import {
  ProductDataType,
  ProductValidator,
} from '../../../validators/product-validator ';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/config/auth_options';

export async function POST(request: Request) {
  try {
    /*  const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json('Unauthorized', { status: 401 });
    } */
    const body: ProductDataType = await request.json();
    // валидация body при помощи zod
    const validation = ProductValidator.safeParse(body);
    // console.log('validation:', validation);
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });

    // console.log('BODY:', body);
    //вычисление скидки
    let discount;
    if (body.oldPrice) {
      const result = ((body.oldPrice - body.price) / body.oldPrice) * 100;
      //функция для округления результата
      const roundToNearestHalf = (number: number) => {
        const decimalPart = number - Math.floor(number);

        if (decimalPart >= 0.5) {
          // Округление вверх
          return Math.ceil(number);
        } else {
          // Округление вниз
          return Math.floor(number);
        }
      };
      discount = roundToNearestHalf(result);
    }

    // сохранения значения в базе
    // из-за onDelete:Cascade для Size и Color (автоматическое удаление связанного товара в моделях Size и Color)
    //пришлось сделать отношение многие ко многим явными(т.е. создать объединяющую таблицу)
    // а это немного усложнило подключение к Size и Color
    await prismadb.product.create({
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
          create: body.sizeId.map((item) => {
            return {
              assignedBy: body.name,
              assignedAt: new Date(),
              size: { connect: { id: item } },
            };
          }),
        },

        colors: {
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
    return NextResponse.json({ message: 'Data is saved' });
  } catch (error) {
    console.log('ERRORRR:', error);
    return NextResponse.json('Data is not saved', { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const allProduct = await prismadb.product.findMany();
    return NextResponse.json(allProduct);
  } catch (error) {
    console.log(error);
  }
}
