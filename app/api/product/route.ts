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
    // проверка на существования такого же значения
    const candidate = await prismadb.product.findUnique({
      where: {
        name: body.name,
      },
    });
    if (candidate) {
      return NextResponse.json('This product already exist', { status: 400 });
    }
    console.log('BODY:', body);
    // сохранения значения в базе
    await prismadb.product.create({
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
    return NextResponse.json({ message: 'Data is saved' });
  } catch (error) {
    return NextResponse.json('Data is not saved', { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    //пагинация
    const page = Number(searchParams.get('page')) || 1;
    const limit = Number(searchParams.get('limit')) || 3;
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
    let filter = {} as any;
    if (categoryId) filter.categoryId = categoryId;
    if (typeId.length > 0) filter.typeId = { in: typeId };
    if (brandId.length > 0) filter.brandId = { in: brandId };
    if (sizeId.length > 0) filter.sizeId = { in: sizeId };
    if (colorId.length > 0) filter.colorId = { in: colorId };
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
    const product = await prismadb.product.findMany({
      skip: offset,
      take: limit,
      where: filter,
    });
    console.log('Product:', product);
    return NextResponse.json({ count, product });
  } catch (error) {
    console.log('Error:', error);
    return NextResponse.json('Something went wrong', { status: 500 });
  }
}
