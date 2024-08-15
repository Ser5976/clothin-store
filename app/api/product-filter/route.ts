import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';

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
    const isBestseller = searchParams.get('isBestseller');
    const discount = searchParams.get('discount');
    const sort = searchParams.get('sort');
    const year = searchParams.get('year');
    const collectionId = searchParams.get('collectionId');

    // определение года,это для фильтрации товаров по году
    const currentYear = new Date().getFullYear(); // Получаем текущий год
    const startOfYear = new Date(currentYear, 0, 1); // 1 января года
    const endOfYear = new Date(currentYear + 1, 0, 1); // 1 января следующего года
    /* console.log('currentYear:', currentYear);
    console.log('startOfYear:', startOfYear);
    console.log('endOfYear:', endOfYear); */
    // создаём объект параметров фильтрации
    //Оператор in  указывает на массив значений, и условие считается выполненным,
    //если хотя бы одно из значений входит в указанный массив.
    let filter = {} as any;
    if (categoryId) filter.categoryId = categoryId;
    if (typeId.length > 0) filter.typeId = { in: typeId };
    if (brandId.length > 0) filter.brandId = { in: brandId };
    if (isBestseller === 'true') filter.isBestseller = true;
    //Оператор some полезен, когда вы хотите проверить,
    // выполняется ли условие хотя бы для одного элемента массива или одной вложенной записи.
    // при явных отношениях многие ко многим немножко по вкладистей
    if (sizeId.length > 0) filter.sizes = { some: { sizeId: { in: sizeId } } };
    if (colorId.length > 0)
      filter.colors = { some: { colorId: { in: colorId } } };
    if (materialId.length > 0) filter.materialId = { in: materialId };
    if (minPrice && maxPrice)
      filter.price = { gte: Number(minPrice), lte: Number(maxPrice) };
    if (minPrice && maxPrice === null) filter.price = { gte: Number(minPrice) };
    if (maxPrice && minPrice === null) filter.price = { lte: Number(maxPrice) };
    if (discount) filter.discount = { not: null };
    if (year)
      filter.createdAt = {
        gte: startOfYear, // больше или равно началу текущего года
        lt: endOfYear, // меньше начала следующего года
      };
    if (collectionId)
      filter.collectionItems = { some: { productCollectionId: collectionId } };

    //console.log('filter:', filter);
    /* console.log('discount:', discount);
    console.log('sort:', sort);
    console.log('limit:', limit);
    console.log('page:', page);
    console.log('year:', year);
 */

    // получает количество для пагинации
    const count = await prismadb.product.count({
      where: filter,
    });
    //рассчёт количества страниц,для пагинации
    const pageQty = Math.ceil(count / limit);

    // ну и сам запрос
    //skip: Определяет количество записей, которые следует пропустить перед началом возвращаемых результатов.
    //take: Определяет количество записей, которые следует взять из результата.
    const product = await prismadb.product.findMany({
      skip: offset,
      take: limit,
      where: filter,
      orderBy: discount
        ? { discount: 'desc' }
        : sort && sort === 'priceAsc'
        ? { price: 'asc' }
        : sort && sort === 'priceDesc'
        ? { price: 'desc' }
        : sort && sort === 'ratingAsc'
        ? { rating: { value: 'asc' } }
        : sort && sort === 'ratingDesc'
        ? { rating: { value: 'desc' } }
        : { createdAt: 'desc' }, //создаём строку сортировки

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
        collectionItems: true,
      },
    });
    // console.log('Product:', count);
    return NextResponse.json({ count, product, pageQty });
  } catch (error) {
    console.log('Error:', error);
    return NextResponse.json('Something went wrong', { status: 500 });
  }
}
