import prismadb from '@/lib/prismadb';
import {
  CollectionDataType,
  CollectionValidator,
} from '../../../../validators/collection-validator';
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

    // удаление значения в базе
    await prismadb.collectionItem.delete({
      where: { id: params.id },
    });
    return NextResponse.json({ message: 'Collection-item removed' });
  } catch (error) {
    return NextResponse.json('The collection-item is not remoed', {
      status: 500,
    });
  }
}
