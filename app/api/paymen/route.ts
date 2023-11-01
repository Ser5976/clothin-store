import prismadb from '@/lib/prismadb';
import YooKassa from 'yookassa-ts/lib/yookassa';
import {
  OrderDataType,
  OrderValidator,
} from '../../../validators/order-validator';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

const yooKassa = new YooKassa({
  shopId: process.env['SHOP_ID'],
  secretKey: process.env['SECRET_KEY'],
});
//console.log('shopId:', yooKassa.shopId);
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request: Request) {
  try {
    /* const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json('Unauthorized', { status: 401 });
    } */
    const body: any = await request.json();
    // валидация body при помощи zod
    /* const validation = OrderValidator.safeParse(body);
    // console.log('validation:', validation);
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });
 */
    console.log('Payment:', body);
    // console.log('EVENT:', body.event);
    // console.log('DESCRIPTION:', body.object.description.split('#')[1]);
    if (body.event === 'payment.waiting_for_capture') {
      await yooKassa.capturePayment(body.object.id, body.object.amount);
      return NextResponse.json(
        { message: 'payment' },
        {
          headers: corsHeaders,
        }
      );
    }
    if (body.event === 'payment.succeeded') {
      await prismadb.order.update({
        where: { id: body.object.description.split('#')[1] },
        data: { isPaid: true },
      });

      return NextResponse.json(
        { message: 'payment' },
        {
          headers: corsHeaders,
        }
      );
    }

    return NextResponse.json(
      { message: 'payment' },
      {
        headers: corsHeaders,
      }
    );
  } catch (error) {
    return NextResponse.json(error);
  }
}
