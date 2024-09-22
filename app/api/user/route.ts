import prismadb from '@/lib/prismadb';
import {
  FavoritesDataType,
  FavoritesValidator,
} from '../../../validators/favorites-validator';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/config/auth_options';

export async function GET(request: Request) {
  console.log('работает');

  try {
    const session = await getServerSession(authOptions);
    console.log('session:', session);
    if (!session?.user) {
      return NextResponse.json('Unauthorized', { status: 401 });
    }
    console.log('userId:', session.user.id);
    const user = await prismadb.user.findFirst({
      where: {
        id: session.user.id,
      },
      include: {
        favorites: true,
        catr: true,
        order: { include: { orderItems: true, address: true } },
        review: true,
        storeReviews: true,
        address: true,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json('Something went wrong', { status: 500 });
  }
}
