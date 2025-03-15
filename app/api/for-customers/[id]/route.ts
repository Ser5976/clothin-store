import prismadb from '@/lib/prismadb';
import {
  CustomersDataType,
  CustomersValidator,
} from '../../../../validators/customers-validator';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/config/auth_options';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user.role !== 'ADMIN') {
      return NextResponse.json('Forbidden', { status: 403 });
    }

    const body: CustomersDataType = await request.json();
    // валидация body при помощи zod
    const validation = CustomersValidator.safeParse(body);
    // console.log('validation:', validation);
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });

    // изменения значения в базе
    await prismadb.customers.update({
      where: { id: params.id },
      data: body,
    });
    return NextResponse.json({ message: 'Customers changed' });
  } catch (error) {
    return NextResponse.json('Customers is not changed', { status: 500 });
  }
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const customer = await prismadb.customers.findFirst({
      where: { id: params.id },
    });
    return NextResponse.json(customer);
  } catch (error) {
    console.log(error);
  }
}
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user.role !== 'ADMIN') {
      return NextResponse.json('Forbidden', { status: 403 });
    }

    // удаление значения в базе
    await prismadb.customers.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: 'Customers removed' });
  } catch (error) {
    return NextResponse.json('Customers is not remoed', { status: 500 });
  }
}
