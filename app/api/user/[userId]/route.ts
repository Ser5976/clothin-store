import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const user = await prismadb.user.findFirst({
      where: {
        id: params.userId,
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

export async function DELETE(
  request: Request,
  { params }: { params: { userId: string } }
) {
  try {
    /* const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json('Unauthorized', { status: 401 });
    } */

    // удаление пользователя
    await prismadb.user.delete({
      where: { id: params.userId },
    });
    return NextResponse.json({ message: 'User removed' });
  } catch (error) {
    return NextResponse.json('The User is not remoed', { status: 500 });
  }
}
