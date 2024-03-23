import prismadb from '@/lib/prismadb';
import {
  DeliveryValidator,
  DeliveryDataType,
} from './../../../../validators/delivery-validator';
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

    const body: DeliveryDataType = await request.json();
    // валидация body при помощи zod
    const validation = DeliveryValidator.safeParse(body);
    // console.log('validation:', validation);
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });

    // изменения значения в базе
    await prismadb.delivery.update({
      where: { id: params.id },
      data: body,
    });
    return NextResponse.json({ message: 'Delivery changed' });
  } catch (error) {
    return NextResponse.json('The delivery is not changed', { status: 500 });
  }
}
