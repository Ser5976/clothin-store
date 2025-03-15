import prismadb from '@/lib/prismadb';
import {
  ProductDataType,
  ProductValidator,
} from '../../../validators/product-validator';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/config/auth_options';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user.role !== 'ADMIN') {
      return NextResponse.json('Forbidden', { status: 403 });
    }
    const body: ProductDataType = await request.json();
    // валидация body при помощи zod
    const validation = ProductValidator.safeParse(body);
    // console.log('validation:', validation);
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });

    // console.log('BODY:', body);
    // добавление в модель категорию тип товара
    // сначала получаем нужную категорию
    const selectedCategory = await prismadb.category.findUnique({
      where: { id: body.categoryId },
      include: { types: true },
    });
    //теперь проверяем если выбранный тип в этой категории
    const isType = selectedCategory?.types.find(
      (type) => type.id === body.typeId
    );
    // ну и добавляем тип в категорию,если он отсутствует
    if (!isType) {
      await prismadb.category.update({
        where: { id: body.categoryId },
        data: {
          types: {
            connect: [{ id: body.typeId }],
          },
        },
      });
    }
    //вычисление скидки
    let discount;
    if (body.oldPrice) {
      const result =
        ((Number(body.oldPrice) - Number(body.price)) / Number(body.oldPrice)) *
        100;
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
        price: Number(body.price),
        oldPrice: body.oldPrice ? Number(body.oldPrice) : undefined,
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
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    let products;
    // количество всех товаров
    const count = await prismadb.product.count();
    //получение товаров
    if (query) {
      products = await prismadb.product.findMany({
        where: {
          OR: [{ name: { contains: query } }],
        },
        include: {
          image: true,
        },
      });
    } else {
      products = await prismadb.product.findMany({
        take: 100,
        include: {
          image: true,
        },
      });
    }
    const productData = { count, products };

    return NextResponse.json(productData);
  } catch (error) {
    console.log(error);
  }
}
