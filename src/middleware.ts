import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const authPath = [
  '/',
  '/auth/signup',
  '/auth/verify',
  '/auth/login',
  '/auth/forgot-password',
  '/auth/reset-password',
]; // paths that don't require authentication

export default function middleware(request: NextRequest) {
  const hasToken = request.cookies.get('token');
  const isAuthPath = authPath.includes(request.nextUrl.pathname);
  if (hasToken && isAuthPath) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  let redirectUrl = `/auth/login?ref=${request.nextUrl.pathname}`;
  if (request.nextUrl.searchParams) {
    redirectUrl += `?${request.nextUrl.searchParams}`;
  }

  if (hasToken) {
    return NextResponse.next();
  }

  if (isAuthPath) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL(redirectUrl, request.url));
}
export const config = {
  matcher: [
    '/auth/signup',
    '/auth/verify',
    '/auth/login',
    '/auth/forgot-password',
    '/auth/reset-password',
    '/product/:id',
    '/cart',
    '/checkout',
    '/profile/user',
    '/profile/orders',
    '/profile/warranty',
    '/profile/coupon',
  ],
};
