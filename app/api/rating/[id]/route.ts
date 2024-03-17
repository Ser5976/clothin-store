import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const reviews = await prismadb.rating.findFirst({
      where: { productId: params.id },
    });
    return NextResponse.json(reviews);
  } catch (error) {
    return NextResponse.json('Rating is dont received', { status: 500 });
  }
}
