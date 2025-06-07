import prismadb from '@/lib/prismadb';
import {
  BrandDataType,
  BrandValidator,
} from '../../../validators/brand-validator';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/config/auth_options';

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user.role !== 'ADMIN') {
      return NextResponse.json('Forbidden', { status: 403 });
    }
    const body: BrandDataType = await request.json();
    // валидация body при помощи zod
    const validation = BrandValidator.safeParse(body);
    // console.log('validation:', validation);
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });
    // проверка на существования такого же значения
    const candidate = await prismadb.brand.findUnique({
      where: {
        name: body.name,
      },
    });
    if (candidate) {
      return NextResponse.json('This brand already exist', { status: 400 });
    }
    // сохранения значения в базе
    await prismadb.brand.create({
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
    let brands;
    // количество всех типов
    const count = await prismadb.brand.count();
    //получение товаров
    if (query) {
      brands = await prismadb.brand.findMany({
        where: {
          OR: [{ name: { contains: query,mode: 'insensitive' } }],
        },
      });
    } else {
      brands = await prismadb.brand.findMany({});
    }
    const brandData = { count, brands };

    return NextResponse.json(brandData);
  } catch (error) {
    console.log(error);
  }
}
