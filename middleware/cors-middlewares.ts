import { NextRequest, NextResponse } from 'next/server';

export const corsMiddelware = (req: NextRequest) => {
  const res = NextResponse.next();
  if (req.nextUrl.pathname === '/api/:pahs*') {
    res.headers.set('Access-Control-Allow-Origin', '*');
    res.headers.set(
      'Access-Control-Allow-Methods',
      'GET,POST,PUT,DELETE,OPTIONS'
    );
    res.headers.set(
      'Access-Control-Allow-Headers',
      'Content-Type,Authorization'
    );
    res.headers.set('Access-Control-Max-Age', '86400');
  }
  return res;
};
