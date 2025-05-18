import prismadb from '@/lib/prismadb';

import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');
    //console.log('query:', query);
    let users;
    if (query) {
      users = await prismadb.user.findMany({
        where: {
          OR: [{ email: { contains: query } }],
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
    } else {
      users = await prismadb.user.findMany({
        take: 100,
        include: {
          favorites: true,
          catr: true,
          order: { include: { orderItems: true, address: true } },
          review: true,
          storeReviews: true,
          address: true,
        },
      });
    }

    return NextResponse.json(users);
  } catch (error) {
    console.log(error);
    return NextResponse.json('Something went wrong', { status: 500 });
  }
}
