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
    if (session?.user.role !== 'ADMIN') {
      return NextResponse.json('Forbidden', { status: 403 });
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
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    let materials;
    // количество всех материалов
    const count = await prismadb.material.count();
    //получение товаров
    if (query) {
      materials = await prismadb.material.findMany({
        where: {
          OR: [{ name: { contains: query } }],
        },
      });
    } else {
      materials = await prismadb.material.findMany({});
    }
    const materialData = { count, materials };

    return NextResponse.json(materialData);
  } catch (error) {
    console.log(error);
  }
}
