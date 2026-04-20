import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const locale = request.cookies.get('NEXT_LOCALE')?.value || 'ar'; // default to Arabic

  // Protect dashboard routes
  if (pathname.startsWith('/projects') || pathname.startsWith('/events')) {
    const token = request.cookies.get('auth-token');
    if (!token) {
      return NextResponse.redirect(new URL(`/${locale}`, request.url));
    }
  }

  // Redirect / to /ar (Arabic first)
  if (pathname === '/') {
    return NextResponse.redirect(new URL('/ar', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
