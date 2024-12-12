import prismadb from '@/lib/prismadb';
import {
  SizeDataType,
  SizeValidator,
} from './../../../validators/size-validator';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/config/auth_options';

export async function GET() {
  try {
    const sizes = await prismadb.size.findMany();
    return NextResponse.json(sizes);
  } catch (error) {
    return NextResponse.json('Something went wrong', { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json('Unauthorized', { status: 401 });
    }
    const body: SizeDataType = await request.json();
    // валидация body при помощи zod
    const validation = SizeValidator.safeParse(body);
    // console.log('validation:', validation);
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });
    // проверка на существования такого же значения
    const candidate = await prismadb.size.findUnique({
      where: {
        value: body.value,
      },
    });
    if (candidate) {
      return NextResponse.json('This size already exist', { status: 400 });
    }
    // сохранения значения в базе
    await prismadb.size.create({
      data: body,
    });
    return NextResponse.json({ message: 'Data is saved' });
  } catch (error) {
    return NextResponse.json('Data is not saved', { status: 500 });
  }
}
