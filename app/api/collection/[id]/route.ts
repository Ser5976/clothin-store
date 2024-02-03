import prismadb from '@/lib/prismadb';
import {
  CollectionDataType,
  CollectionValidator,
} from '../../../../validators/collection-validator';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/config/auth_options';

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    /* const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json('Unauthorized', { status: 401 });
    } */

    const body: CollectionDataType = await request.json();
    // валидация body при помощи zod
    const validation = CollectionValidator.safeParse(body);
    // console.log('validation:', validation);
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });

    // изменения значения в базе
    await prismadb.productCollection.update({
      where: { id: params.id },
      data: {
        name: body.name,
        description: body.description,
        image: {
          delete: {},
          create: body.image,
        },
        collectionItem: {
          deleteMany: {},
          create: body.collectionItem.map((item) => item),
        },
      },
    });
    return NextResponse.json({ message: 'Collection changed' });
  } catch (error) {
    console.log('ERROR:', error);
    return NextResponse.json('Collection is not changed', { status: 500 });
  }
}
