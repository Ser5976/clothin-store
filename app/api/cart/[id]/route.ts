import prismadb from '@/lib/prismadb';
import {
  CartUpdateDataType,
  CartUpdateValidator,
} from '../../../../validators/cartUpdate-validator';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/config/auth_options';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const cart = await prismadb.cart.findUnique({
      where: {
        userId: params.id,
      },
      // оператор include показывает вложенную запись, при помощи оператора select выбираешь какое поле показать
      include: {
        items: true,
      },
    });
    console.log('cart:', cart);
    //вычесляем общую сумму товаров
    const sumTotalPrice = cart?.items.reduce((acc, item) => {
      return acc + Number(item.totalPrice);
    }, 0);

    // вычесляем общую сумму товаров ,без скидки
    const sumTotalOldPrice = cart?.items.reduce((acc, item) => {
      // console.log('item:', item);
      const sum = Number(item.totalOldPrice)
        ? Number(item.totalOldPrice)
        : Number(item.totalPrice);
      // console.log('sum:', sum);
      return acc + Number(sum);
    }, 0);

    return NextResponse.json({ cart, sumTotalPrice, sumTotalOldPrice });
  } catch (error) {
    console.log(error);
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json('Unauthorized', { status: 401 });
    }

    const body: CartUpdateDataType = await request.json();
    // валидация body при помощи zod
    const validation = CartUpdateValidator.safeParse(body);
    // console.log('validation:', validation);
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });

    // изменения значения в базе
    await prismadb.cartItems.update({
      where: { id: params.id },
      data: {
        quantity: body.quantity,
        totalPrice: body.price * body.quantity,
        totalOldPrice: body.oldPrice ? body.oldPrice * body.quantity : 0,
      },
    });
    return NextResponse.json({ message: 'Quantity  changed' });
  } catch (error) {
    return NextResponse.json('Quantity is not changed', { status: 500 });
  }
}
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json('Unauthorized', { status: 401 });
    }

    // удаление значения в базе
    await prismadb.cartItems.delete({
      where: { id: params.id },
    });
    return NextResponse.json({
      message: 'The product has been removed from the cart ',
    });
  } catch (error) {
    return NextResponse.json('The product is not remoed from the cart', {
      status: 500,
    });
  }
}
