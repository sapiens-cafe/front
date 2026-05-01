import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Redirect legacy /fr/* URLs to flat /*  (301 permanent)
  if (pathname === '/fr' || pathname.startsWith('/fr/')) {
    const newPath = pathname === '/fr' ? '/' : pathname.slice(3);
    return NextResponse.redirect(new URL(newPath, request.url), { status: 301 });
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)'],
};
