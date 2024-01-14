import prismadb from '@/lib/prismadb';
import {
  FavoritesDataType,
  FavoritesValidator,
} from '../../../validators/favorites-validator';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../auth/config/auth_options';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json('Unauthorized', { status: 401 });
    }
    const user = await prismadb.user.findFirst({
      where: {
        id: session.user.id,
      },
      include: {
        favorites: true,
        catr: true,
      },
    });
    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
    return NextResponse.json('Something went wrong', { status: 500 });
  }
}
