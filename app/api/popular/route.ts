import prismadb from '@/lib/prismadb';
import {
  PopularTypesValidator,
  PopularTypesValidatorDataType,
} from '@/validators/popular-types-validator';

import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
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
  console.log('работает популар');
  try {
    /* const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json('Unauthorized', { status: 401 });
    } */
    const body: PopularTypesValidatorDataType = await request.json();
    console.log('popular:', body);
    // валидация body при помощи zod
    const validation = PopularTypesValidator.safeParse(body);
    // console.log('validation:', validation);
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });

    // сохранения значения в базе
    const popularTypes = await prismadb.popularTypes.create({
      data: {
        title: body.title,
        link: body.link,
        image: {
          create: body.image,
        },
      },
    });
    return NextResponse.json(popularTypes);
  } catch (error) {
    return NextResponse.json('Data is not saved', { status: 500 });
  }
}
