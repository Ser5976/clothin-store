import prismadb from '@/lib/prismadb';
import YooKassa from 'yookassa-ts/lib/yookassa';
import {
  OrderDataType,
  OrderValidator,
} from '../../../validators/order-validator';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/config/auth_options';

// подключаемся к YooKassa(платежная система)
const yooKassa = new YooKassa({
  shopId: process.env['SHOP_ID'],
  secretKey: process.env['SECRET_KEY'],
});
//console.log('shopId:', yooKassa.shopId);

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json('Unauthorized', { status: 401 });
    }
    const body: OrderDataType = await request.json();
    // валидация body при помощи zod
    const validation = OrderValidator.safeParse(body);
    // console.log('validation:', validation);
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });

    // console.log('body:', body);
    // создаём заказ и записываем в базу
    const order = await prismadb.order.create({
      data: {
        userId: session.user.id,
        firstName: body.firstName,
        lastName: body.lastName,
        email: body.email,
        phone: body.phone,
        amount: body.amount,
        address: {
          create: body.address,
        },
        orderItems: {
          create: body.orderItems,
        },
      },
    });
    // console.log('order:', order);

    // создаём заказ для YooKassa(хренова они затипизировали)
    const payment = await yooKassa.createPayment({
      amount: {
        value: String(order.amount),
        currency: 'RUB' as any,
      },
      payment_method_data: {
        type: 'bank_card' as any,
      },
      confirmation: {
        type: 'redirect',
        return_url: `${process.env.NEXTAUTH_URL}/checkout`,
      },
      description: `Заказ#${order.id}`,
    } as any);

    return NextResponse.json(payment);
  } catch (error) {
    return NextResponse.json(error);
  }
}
