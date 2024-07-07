import prismadb from '@/lib/prismadb';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '../../auth/config/auth_options';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const order = await prismadb.order.findUnique({
      where: {
        id: params.id,
      },
      include: {
        orderItems: true,
      },
    });
    console.log('ORDER:', order);
    return NextResponse.json(order);
  } catch (error) {
    console.log('ERRROR:', error);
  }
}
