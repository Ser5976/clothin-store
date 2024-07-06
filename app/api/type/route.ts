import prismadb from '@/lib/prismadb';
import {
  TypeDataType,
  TypeValidator,
} from '../../../validators/type-validator ';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/config/auth_options';

export async function POST(request: Request) {
  try {
    // const session = await getServerSession(authOptions);
    // if (!session?.user) {
    //   return NextResponse.json('Unauthorized', { status: 401 });
    // }
    const body: TypeDataType = await request.json();
    // валидация body при помощи zod
    const validation = TypeValidator.safeParse(body);
    // console.log('validation:', validation);
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });
    // проверка на существования такого же значения
    const candidate = await prismadb.type.findUnique({
      where: {
        name: body.name,
      },
    });
    if (candidate) {
      return NextResponse.json('This type already exist', { status: 400 });
    }
    // сохранения значения в базе
    await prismadb.type.create({
      data: body,
    });
    return NextResponse.json({ message: 'Data is saved' });
  } catch (error) {
    return NextResponse.json('Data is not saved', { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const type = await prismadb.type.findMany();
    return NextResponse.json(type);
  } catch (error) {
    console.log(error);
  }
}
