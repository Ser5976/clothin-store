import prismadb from '@/lib/prismadb';
import {
  PopularTypesValidator,
  PopularTypesDataType,
} from '@/validators/popular-types-validator';

import { getServerSession } from 'next-auth';
import { NextResponse, NextRequest } from 'next/server';
import { authOptions } from '../auth/config/auth_options';

export async function GET(request: Request) {
  // const token = request.cookies.get('accessToken')?.value;
  //  const session = await getServerSession(authOptions);
  // console.log('token from popular:', token);
  // console.log('sesion from popular:', session);
  try {
    const popularTypes = await prismadb.popularTypes.findMany({
      include: {
        image: true,
      },
    });
    return NextResponse.json(popularTypes);
  } catch (error) {
    console.log(error);
  }
}
export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user.role !== 'ADMIN') {
      return NextResponse.json('Forbidden', { status: 403 });
    }
    const body: PopularTypesDataType = await request.json();

    // валидация body при помощи zod
    const validation = PopularTypesValidator.safeParse(body);
    // console.log('validation:', validation);
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });
    //popular type у нас должно быть не больше 7-х, поэтому делаем проверку
    const countPopularType = await prismadb.popularTypes.count();
    if (countPopularType === 7)
      return NextResponse.json('There should be no more than 7 billboards', {
        status: 400,
      });
    // сохранения значения в базе
    const poularType = await prismadb.popularTypes.create({
      data: {
        title: body.title,
        link: body.link,
        image: {
          create: body.image,
        },
      },
    });
    return NextResponse.json({ message: `${poularType.title} is saved` });
  } catch (error) {
    return NextResponse.json('Data is not saved', { status: 500 });
  }
}
