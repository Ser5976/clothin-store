import prismadb from '@/lib/prismadb';
import {
  CustomersDataType,
  CustomersValidator,
} from '../../../validators/customers-validator';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/config/auth_options';

export async function GET(request: Request) {
  try {
    const customers = await prismadb.customers.findMany();
    return NextResponse.json(customers);
  } catch (error) {
    console.log(error);
    return NextResponse.json('Something went wrong', { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    /* const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json('Unauthorized', { status: 401 });
    } */
    const body: CustomersDataType = await request.json();
    // валидация body при помощи zod
    const validation = CustomersValidator.safeParse(body);
    // console.log('validation:', validation);
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });
    //для клиентов  у нас должно быть не больше 4-х, поэтому делаем проверку
    const countCustomers = await prismadb.customers.count();
    if (countCustomers === 4)
      return NextResponse.json('There should be no more than 4 billboards', {
        status: 400,
      });
    // проверка на существования такого же значения
    const candidate = await prismadb.customers.findUnique({
      where: {
        name: body.name,
      },
    });
    if (candidate) {
      return NextResponse.json('This customers already exist', { status: 400 });
    }
    // сохранения значения в базе
    await prismadb.customers.create({
      data: body,
    });
    return NextResponse.json({ message: 'Data is saved' });
  } catch (error) {
    return NextResponse.json('Data is not saved', { status: 500 });
  }
}
