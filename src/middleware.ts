import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (req.nextUrl.pathname === '/') {
    if (token) {
      return NextResponse.redirect(new URL('/admin', req.url));
    } else {
      return NextResponse.redirect(new URL('/signin', req.url));
    }
  }

  if (req.nextUrl.pathname === '/signin' && token) {
    return NextResponse.redirect(new URL('/admin', req.url));
  }

  if (req.nextUrl.pathname.startsWith('/admin') && !token) {
    return NextResponse.redirect(new URL('/signin', req.url));
  }

  return NextResponse.next();
}
