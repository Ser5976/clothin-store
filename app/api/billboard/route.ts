import prismadb from '@/lib/prismadb';
import {
  BillboardDataType,
  BillboardValidator,
} from '../../../validators/billboard-validator ';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/config/auth_options';

export async function GET(request: Request) {
  try {
    const billboard = await prismadb.billboard.findMany({
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
    const session = await getServerSession(authOptions);
    if (session?.user.role !== 'ADMIN') {
      return NextResponse.json('Forbidden', { status: 403 });
    }
    const body: BillboardDataType = await request.json();
    // валидация body при помощи zod
    const validation = BillboardValidator.safeParse(body);
    // console.log('validation:', validation);
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });

    //билбордов у нас должно быть не больше 4-х, поэтому делаем проверку
    const countBilboard = await prismadb.billboard.count();
    if (countBilboard === 4)
      return NextResponse.json('There should be no more than 4 billboards', {
        status: 400,
      });
    // console.log('billboard-data-create:', body);
    // сохранения значения в базе
    const billboard = await prismadb.billboard.create({
      data: {
        title: body.title,
        subTitle: body.subTitle,
        link: body.link,
        image: {
          create: body.image,
        },
      },
    });
    return NextResponse.json(billboard);
  } catch (error) {
    return NextResponse.json('Data is not saved', { status: 500 });
  }
}
