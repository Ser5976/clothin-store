import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';

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
    // console.log('ORDER:', order);
    return NextResponse.json(order);
  } catch (error) {
    console.log('ERRROR:', error);
  }
}
