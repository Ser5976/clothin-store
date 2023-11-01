import prismadb from '@/lib/prismadb';
import {
  CartUpdateDataType,
  CartUpdateValidator,
} from '../../../../validators/cartUpdate-validator';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/config/auth_options';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    /*  const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json('Unauthorized', { status: 401 });
    } */

    const body: CartUpdateDataType = await request.json();
    // валидация body при помощи zod
    const validation = CartUpdateValidator.safeParse(body);
    // console.log('validation:', validation);
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });

    // изменения значения в базе
    await prismadb.cartItems.update({
      where: { id: params.id },
      data: { quantity: body.quantity },
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
    /* const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json('Unauthorized', { status: 401 });
    } */

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
