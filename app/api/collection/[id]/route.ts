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
    const session = await getServerSession(authOptions);
    if (session?.user.role !== 'ADMIN') {
      return NextResponse.json('Forbidden', { status: 403 });
    }

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

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const collection = await prismadb.productCollection.findFirst({
      where: { id: params.id },
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        image: true,
        collectionItem: {
          include: {
            product: {
              include: {
                category: { select: { id: true, name: true } },
                type: { select: { id: true, name: true } },
                brand: { select: { id: true, name: true } },
                material: { select: { id: true, name: true } },
                rating: { select: { value: true, count: true } },
                image: true,
                sizes: { select: { size: true } },
                colors: { select: { color: true } },
              },
            },
          },
        },
      },
    });
    return NextResponse.json(collection);
  } catch (error) {
    console.log(error);
  }
}
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (session?.user.role !== 'ADMIN') {
      return NextResponse.json('Forbidden', { status: 403 });
    }

    // удаление значения в базе
    await prismadb.productCollection.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: 'Collection removed' });
  } catch (error) {
    return NextResponse.json('The collection is not remoed', { status: 500 });
  }
}
