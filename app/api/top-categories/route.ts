import prismadb from '@/lib/prismadb';
import {
  TopCategoreisValidatorDataType,
  TopCategoriesValidator,
} from '../../../validators/topCategories-validator';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/config/auth_options';

export async function GET(request: Request) {
  try {
    const billboard = await prismadb.topCategories.findMany({
      include: {
        image: true,
      },
    });
    return NextResponse.json(billboard);
  } catch (error) {
    console.log(error);
    return NextResponse.json('Something went wrong', { status: 500 });
  }
}
export async function POST(request: Request) {
  try {
    /*  const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json('Unauthorized', { status: 401 });
    } */
    const body: TopCategoreisValidatorDataType = await request.json();
    // валидация body при помощи zod
    const validation = TopCategoriesValidator.safeParse(body);
    // console.log('validation:', validation);
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });

    // сохранения значения в базе
    const topCategories = await prismadb.topCategories.create({
      data: {
        title: body.title,
        link: body.link,
        image: {
          create: body.image,
        },
      },
    });
    return NextResponse.json(topCategories);
  } catch (error) {
    return NextResponse.json('Data is not saved', { status: 500 });
  }
}
