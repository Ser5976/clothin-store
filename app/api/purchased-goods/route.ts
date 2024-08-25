import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';

// запрос на получение товаров,которые чаще всего покупают, отсортированный по количеству покупок от большего к меньшему
export async function GET(request: Request) {
  try {
    // сначала, при помощи групировки, получаем сгрупированные данне: Id товара + количество товара в  orderItem
    const purchasedGoods = await prismadb.orderItem.groupBy({
      by: ['productId'],
      _count: { id: true },
      orderBy: {
        _count: {
          id: 'desc',
        },
      },
    });
    // получаем такую структуру[{ _count: { id: 7 },productId: '9baeec6a-07a5-41d6-ab22-9548271cdae8'},-//-],
    // делаем условие ,на случай пустого OrderItem
    if (purchasedGoods.length > 0) {
      // подготавливаем структу данных,  Id товаров, для запроса на получение в модель товаров
      const productsId = purchasedGoods.map((item) => item.productId);
      // получаем товары
      const products = await prismadb.product.findMany({
        where: {
          id: { in: productsId },
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
          collectionItems: true,
        },
        take: 15,
      });
      // так как порядок возвращаемых товаров не гарантированно будет совпадать с порядком, указанным в массиве productsId,
      // делаем  сортировку товаров в соответствии с порядком в productsId
      const sortedProducts = productsId.map((id) =>
        products.find((product) => product.id === id)
      );
      //  console.log('productId:', productsId);
      return NextResponse.json(sortedProducts);
    }
    return NextResponse.json([]);
  } catch (error) {
    console.log(error);
  }
}
