import prismadb from '@/lib/prismadb';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/config/auth_options';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    /* const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json('Unauthorized', { status: 401 });
    } */

    // удаление значения в базе
    await prismadb.image.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: 'image is removed' });
  } catch (error) {
    return NextResponse.json('image is not remoed', { status: 500 });
  }
}
