import prismadb from '@/lib/prismadb';
import {
  ColorDataType,
  ColorValidator,
} from '../../../validators/color-validator';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/config/auth_options';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user.role !== 'ADMIN') {
      return NextResponse.json('Forbidden', { status: 403 });
    }
    const body: ColorDataType = await request.json();
    // валидация body при помощи zod
    const validation = ColorValidator.safeParse(body);
    //console.log('validation:', validation);
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });
    // проверка на существования такого же значения
    const candidate = await prismadb.color.findUnique({
      where: {
        value: body.value,
        name: body.name,
      },
    });
    //console.log('candidate:', candidate);
    if (candidate) {
      return NextResponse.json('This color already exist', { status: 400 });
    }
    // сохранения значения в базе
    await prismadb.color.create({
      data: body,
    });
    return NextResponse.json({ message: 'Data is saved' });
  } catch (error) {
    return NextResponse.json('Data is not saved', { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const colors = await prismadb.color.findMany();
    return NextResponse.json(colors);
  } catch (error) {
    console.log(error);
  }
}
