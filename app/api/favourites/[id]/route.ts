import prismadb from '@/lib/prismadb';
import {
  ProductDataType,
  ProductValidator,
} from '../../../../validators/product-validator ';
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

    // удаление товара
    await prismadb.favorites.deleteMany({
      where: { userId: session.user.id, productId: params.id },
    });
    return NextResponse.json({ message: 'Product removed' });
  } catch (error) {
    return NextResponse.json('The Product is not remoed', { status: 500 });
  }
}
