import prismadb from '@/lib/prismadb';
import {
  MaterialDataType,
  MaterialValidator,
} from '../../../validators/material-validator';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/config/auth_options';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json('Unauthorized', { status: 401 });
    }
    const body: MaterialDataType = await request.json();
    // валидация body при помощи zod
    const validation = MaterialValidator.safeParse(body);
    // console.log('validation:', validation);
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });
    // проверка на существования такого же значения
    const candidate = await prismadb.material.findUnique({
      where: {
        name: body.name,
      },
    });
    if (candidate) {
      return NextResponse.json('This material already exist', { status: 400 });
    }
    // сохранения значения в базе
    await prismadb.material.create({
      data: body,
    });
    return NextResponse.json({ message: 'Data is saved' });
  } catch (error) {
    return NextResponse.json('Data is not saved', { status: 500 });
  }
}
export async function GET(request: Request) {
  try {
    const materials = await prismadb.material.findMany();
    return NextResponse.json(materials);
  } catch (error) {
    console.log(error);
  }
}
