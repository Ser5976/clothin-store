import prismadb from '@/lib/prismadb';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const product = await prismadb.likeReview.findMany({
      where: {
        reviewId: params.id,
      },
    });
    return NextResponse.json(product);
  } catch (error) {
    console.log(error);
  }
}
