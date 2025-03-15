import prismadb from '@/lib/prismadb';
import {
  RequisitesDataType,
  RequisitesValidator,
} from '../../../validators/requisites-validator';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/config/auth_options';

export async function GET(request: Request) {
  try {
    const phone = await prismadb.requisites.findMany();
    return NextResponse.json(phone);
  } catch (error) {
    console.log(error);
    return NextResponse.json('Something went wrong', { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user.role !== 'ADMIN') {
      return NextResponse.json('Forbidden', { status: 403 });
    }
    const body: RequisitesDataType = await request.json();
    // валидация body при помощи zod
    const validation = RequisitesValidator.safeParse(body);
    // console.log('validation:', validation);
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });
    //реквизит  у нас должно быть один, поэтому делаем проверку
    const countCollection = await prismadb.requisites.count();
    if (countCollection === 1)
      return NextResponse.json('There should be no more than 1 reaquisites', {
        status: 400,
      });
    // сохранения значения в базе
    await prismadb.requisites.create({
      data: body,
    });
    return NextResponse.json({ message: 'Data is saved' });
  } catch (error) {
    return NextResponse.json('Data is not saved', { status: 500 });
  }
}
