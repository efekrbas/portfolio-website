import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_FILE = /\.(.*)$/;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Ignore static files, api routes, and next internals
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  // If URL explicitly starts with /tr, redirect to remove it (Asymmetric Routing)
  if (pathname === '/tr' || pathname.startsWith('/tr/')) {
    const newPath = pathname.replace(/^\/tr/, '') || '/';
    return NextResponse.redirect(new URL(newPath, request.url), 301);
  }

  // If URL explicitly starts with /en, leave it alone
  if (pathname === '/en' || pathname.startsWith('/en/')) {
    return NextResponse.next();
  }

  // Auto-redirect to English ONLY on the root page if browser language is English
  if (pathname === '/') {
    const acceptLanguage = request.headers.get('accept-language');
    if (acceptLanguage && acceptLanguage.toLowerCase().startsWith('en')) {
      return NextResponse.redirect(new URL('/en', request.url));
    }
  }

  // Rewrite all other prefix-less paths to /tr/... under the hood
  return NextResponse.rewrite(new URL(`/tr${pathname === '/' ? '' : pathname}`, request.url));
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|images|icon.svg|robots.txt|sitemap.xml|favicon.ico).*)'],
};
