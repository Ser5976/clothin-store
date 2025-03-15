import prismadb from '@/lib/prismadb';
import {
  BrandDataType,
  BrandValidator,
} from '../../../../validators/brand-validator';
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

    const body: BrandDataType = await request.json();
    // валидация body при помощи zod
    const validation = BrandValidator.safeParse(body);
    // console.log('validation:', validation);
    if (!validation.success)
      return NextResponse.json(validation.error.errors, { status: 400 });

    // изменения значения в базе
    await prismadb.brand.update({
      where: { id: params.id },
      data: { name: body.name },
    });
    return NextResponse.json({ message: 'Brand changed' });
  } catch (error) {
    return NextResponse.json('Brand is not changed', { status: 500 });
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
    //перед удалением уточняем , что ни один товар не является этим брендом
    const isBrand = await prismadb.product.findFirst({
      where: { brandId: params.id },
    });
    if (isBrand) {
      return NextResponse.json(
        'The brand has not been deleted,delete all products that fall into this brand',
        { status: 400 }
      );
    }
    if (!isBrand) {
      // удаление значения в базе
      await prismadb.brand.delete({
        where: { id: params.id },
      });
      return NextResponse.json({ message: 'Brand removed' });
    }
  } catch (error) {
    return NextResponse.json('The brand is not remoed', { status: 500 });
  }
}
