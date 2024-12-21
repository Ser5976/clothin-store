import prismadb from '@/lib/prismadb';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/config/auth_options';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json('Unauthorized', { status: 401 });
    }

    // удаление избранного
    await prismadb.favorites.deleteMany({
      where: { userId: session.user.id, productId: params.id },
    });
    return NextResponse.json({
      message: 'The deletion was completed successfully',
    });
  } catch (error) {
    return NextResponse.json('Deletion failed', { status: 500 });
  }
}
