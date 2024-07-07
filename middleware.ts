import { NextResponse } from 'next/server';
import withAuth from 'next-auth/middleware';

//next-auth/middleware для защиты приватных роутов, а так же защиты админа
//сначала запускается callbacks и если он выдаёт true, то запускается middleware, в  котром есть нужное нам условие
// если callbacks  выдаёт false(а это произойдёт ,когда не будет токена), то происходит редерект на страницу Signin
export default withAuth(
  function middleware(req) {
    if (
      req.nextUrl.pathname === '/admin' &&
      req.nextauth.token?.role !== 'ADMIN'
    ) {
      req.nextUrl.pathname = '/admin/role';
      return NextResponse.redirect(req.nextUrl);
    }
  },
  {
    callbacks: {
      authorized({ token }) {
        return !!token;
      },
    },
  }
);
// здесь вносим в массив страницы ,которые будем защищать
export const config = { matcher: ['/checkout'] };
