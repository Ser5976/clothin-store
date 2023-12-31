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
      discount = parseFloat(result.toFixed(1));
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
    const { searchParams } = new URL(request.url);
    //пагинация
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 10;
    const offset = page * limit - limit;
    // парметры для фильтрации
    const categoryId = searchParams.get('categoryId');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const typeId = searchParams.getAll('typeId');
    const brandId = searchParams.getAll('brandId');
    const sizeId = searchParams.getAll('sizeId');
    const colorId = searchParams.getAll('colorId');
    const materialId = searchParams.getAll('materialId');
    // создаём объект параметров фильтрации
    //Оператор in  указывает на массив значений, и условие считается выполненным,
    //если хотя бы одно из значений входит в указанный массив.
    let filter = {} as any;
    if (categoryId) filter.categoryId = categoryId;
    if (typeId.length > 0) filter.typeId = { in: typeId };
    if (brandId.length > 0) filter.brandId = { in: brandId };
    //Оператор some полезен, когда вы хотите проверить,
    // выполняется ли условие хотя бы для одного элемента массива или одной вложенной записи.
    // при явных отношениях многои ко многим немножко по вкладистей
    if (sizeId.length > 0) filter.sizes = { some: { colorId: { in: sizeId } } };
    if (colorId.length > 0)
      filter.colors = { some: { colorId: { in: colorId } } };
    if (materialId.length > 0) filter.materialId = { in: materialId };
    if (minPrice && maxPrice)
      filter.price = { gte: Number(minPrice), lte: Number(maxPrice) };
    if (minPrice && maxPrice === null) filter.price = { gte: Number(minPrice) };
    if (maxPrice && minPrice === null) filter.price = { lte: Number(maxPrice) };

    console.log('filter:', filter);
    // получает количество для пагинации
    const count = await prismadb.product.count({
      where: filter,
    });
    // ну и сам запрос
    //skip: Определяет количество записей, которые следует пропустить перед началом возвращаемых результатов.
    //take: Определяет количество записей, которые следует взять из результата.
    const product = await prismadb.product.findMany({
      skip: offset,
      take: limit,
      where: filter,
      orderBy: {
        createdAt: 'desc', // Сортировка по убыванию даты создания
      },
      // оператор include показывает вложенную запись, при помощи оператора select выбираешь какое поле показать
      include: {
        category: { select: { id: true, name: true } },
        type: { select: { id: true, name: true } },
        brand: { select: { id: true, name: true } },
        material: { select: { id: true, name: true } },
        rating: { select: { value: true, count: true } },
        image: true,
        sizes: { select: { size: true } },
        colors: { select: { color: true } },
      },
    });
    // console.log('Product:', product);
    return NextResponse.json({ count, product });
  } catch (error) {
    console.log('Error:', error);
    return NextResponse.json('Something went wrong', { status: 500 });
  }
}
