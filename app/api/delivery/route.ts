import prismadb from '@/lib/prismadb';
import {
  DeliveryValidator,
  DeliveryDataType,
} from './../../../validators/delivery-validator';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/config/auth_options';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user.role !== 'ADMIN') {
      return NextResponse.json('Forbidden', { status: 403 });
    }
    const body: DeliveryDataType = await request.json();
    // валидация body при помощи zod
    const validation = DeliveryValidator.safeParse(body);
    //console.log('validation:', validation);
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });
    //  у нас должно быть не больше 1-го поля, поэтому делаем проверку
    const countDelivery = await prismadb.delivery.count();
    if (countDelivery === 1)
      return NextResponse.json(
        'There should be no more than 1 delivery options',
        {
          status: 400,
        }
      );

    // сохранения значения в базе
    await prismadb.delivery.create({
      data: body,
    });
    return NextResponse.json({ message: 'Data is saved' });
  } catch (error) {
    return NextResponse.json('Data is not saved', { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const delivery = await prismadb.delivery.findMany();
    return NextResponse.json(delivery);
  } catch (error) {
    console.log(error);
    return NextResponse.json('Something went wrong', { status: 500 });
  }
}
