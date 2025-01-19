import { create } from 'zustand';
import prismadb from '@/lib/prismadb';
import {
  CollectionDataType,
  CollectionValidator,
} from '../../../validators/collection-validator';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/config/auth_options';

export async function POST(request: Request) {
  try {
    /*  const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json('Unauthorized', { status: 401 });
    } */
    const body: CollectionDataType = await request.json();
    // валидация body при помощи zod
    const validation = CollectionValidator.safeParse(body);
    // console.log('validation:', validation);
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });

    //коллекций  у нас должно быть не больше 4-х, поэтому делаем проверку
    const countCollection = await prismadb.productCollection.count();
    if (countCollection === 4)
      return NextResponse.json('There should be no more than 4 collection', {
        status: 400,
      });
    await prismadb.productCollection.create({
      data: {
        name: body.name,
        description: body.description,
        image: { create: body.image },
        collectionItem: { create: body.collectionItem.map((item) => item) },
      },
    });
    return NextResponse.json({ message: 'Data is saved' });
  } catch (error) {
    console.log('ERRORRR:', error);
    return NextResponse.json('Data is not saved', { status: 500 });
  }
}

export async function GET(request: Request) {
  try {
    const collections = await prismadb.productCollection.findMany({
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
    return NextResponse.json(collections);
  } catch (error) {
    console.log(error);
  }
}
