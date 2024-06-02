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
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json('Unauthorized', { status: 401 });
    }
    const body: CartDataType = await request.json();
    // валидация body при помощи zod
    const validation = CartValidator.safeParse(body);
    // console.log('validation:', validation);
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });

    //получаем данные по товарам в корзине юзера
    const cart = await prismadb.cart.findUnique({
      where: { userId: session.user.id },
      include: {
        items: true,
      },
    });

    if (!cart) {
      // если корзины нет создаём
      await prismadb.cart.create({
        data: {
          userId: session.user.id,
          items: { create: body },
        },
      });
      return NextResponse.json({ message: 'Data is saved 1' });
    }
    // если корзина существует, делаем проверку полученного массива товаров на наличие их в корзине
    //(это из-за неавторизованной корзины)
    //  Сначала создаем Set с уникальными productId из items корзины(для последующей фильтрации)
    const uniqueProductIds = new Set(cart?.items.map((item) => item.productId));
    // потом фильтруем наши поступившие данные
    const uniqueProducts = body.filter(
      (item) => !uniqueProductIds.has(item.productId)
    );
    // console.log('uniqueItems:', uniqueProducts);
    // потом если у нас в uniqueItems что-то есть,создаём cartItem
    if (uniqueProducts.length !== 0) {
      await prismadb.cartItems.createMany({
        data: uniqueProducts.map((item) => {
          return {
            cartId: cart.id,
            quantity: item.quantity,
            productId: item.productId,
            name: item.name,
            price: item.price,
            oldPrice: item.oldPrice,
            image: item.image,
            size: item.size,
            color: item.color,
            discount: item.discount ?? null,
            totalPrice: item.totalPrice,
            totalOldPrice: item.totalOldPrice,
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
