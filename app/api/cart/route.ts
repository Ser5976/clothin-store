import prismadb from '@/lib/prismadb';
import {
  CartDataType,
  CartValidator,
} from '../../../validators/cart-validator';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/config/auth_options';

export async function POST(request: Request) {
  try {
    /* const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json('Unauthorized', { status: 401 });
    } */
    const body: CartDataType = await request.json();
    // валидация body при помощи zod
    const validation = CartValidator.safeParse(body);
    // console.log('validation:', validation);
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });

    //получаем данные по товарам в корзине юзера
    const cart = await prismadb.cart.findUnique({
      where: { userId: body.userId },
      include: {
        items: true,
      },
    });

    if (!cart) {
      // если корзины нет создаём
      await prismadb.cart.create({
        data: {
          userId: body.userId,
          items: {
            create: body.items,
          },
        },
      });
      return NextResponse.json({ message: 'Data is saved 1' });
    }
    // если корзина существует, делаем проверку полученного массива товаров на наличие их в корзине
    //(это из-за неавторизованной корзины)
    //  Сначала создаем Set с уникальными productId из items корзины(для последующей фильтрации)
    const uniqueProductIds = new Set(cart?.items.map((item) => item.productId));
    // потом фильтруем наши поступившие данные
    const uniqueItems = body.items.filter(
      (item) => !uniqueProductIds.has(item.productId)
    );
    console.log('uniqueItems:', uniqueItems);
    // потом если у нас в uniqueItems что-то есть,создаём cartItem
    if (uniqueItems.length !== 0) {
      await prismadb.cartItems.createMany({
        data: uniqueItems.map((item) => {
          return {
            cartId: cart.id,
            quantity: item.quantity,
            productId: item.productId,
          };
        }),
      });
      return NextResponse.json({ message: 'Data is saved' });
    }

    return NextResponse.json({ message: 'No new products received' });
  } catch (error) {
    return NextResponse.json('Data is not saved', { status: 500 });
  }
}
