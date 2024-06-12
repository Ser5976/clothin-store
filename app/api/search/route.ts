import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';

//это я замутил поиск
// ищу по имени (name) в  моделях type,brand,material,полученные данные из моделей конвертирую,
//добавляю в объект свойство search, при помощи которого буду потом формировать новый запрос для product-filter
// дальше объеденяю все массивы и отправляю на клиент
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    if (typeof query !== 'string') {
      return NextResponse.json('Invalid query parameter', { status: 400 });
    }

    //запросы поиска
    const type = await prismadb.type.findMany({
      where: {
        OR: [{ name: { contains: query } }],
      },
      select: { id: true, name: true },
    });

    const brand = await prismadb.brand.findMany({
      where: {
        OR: [{ name: { contains: query } }],
      },
      select: { id: true, name: true },
    });

    const material = await prismadb.material.findMany({
      where: {
        OR: [{ name: { contains: query } }],
      },
      select: { id: true, name: true },
    });
    //изменение полученных данных
    const modifiedType = type.map((item) => {
      return { ...item, search: 'typeId' };
    });
    const modifiedBrand = brand.map((item) => {
      return { ...item, search: 'brandId' };
    });
    const modifiedMaterial = material.map((item) => {
      return { ...item, search: 'materialId' };
    });

    const searchItem = [...modifiedType, ...modifiedBrand, ...modifiedMaterial];
    return NextResponse.json(searchItem);
  } catch (error) {
    console.log('Error:', error);
    return NextResponse.json('Something went wrong', { status: 500 });
  }
}
