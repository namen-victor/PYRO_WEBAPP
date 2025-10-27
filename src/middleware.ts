import { NextResponse } from 'next/server';

// Protect server-side routes for admin and staff areas
// We gate based on a lightweight cookie set client-side after auth
// For robust enforcement, combine with Firestore rules (already in place)

const ADMIN_PREFIX = '/admin';
const STAFF_PREFIX = '/staff';

export function middleware(request: Request) {
  const { pathname } = new URL(request.url);

  const isProtected = pathname.startsWith(ADMIN_PREFIX) || pathname.startsWith(STAFF_PREFIX);
  if (!isProtected) return NextResponse.next();

  const cookies = (request as any).headers.get('cookie') || '';
  const role = getCookie(cookies, 'pyro_role'); // 'admin' | 'staff' | 'client'
  const isAuthed = getCookie(cookies, 'pyro_auth') === '1';

  if (!isAuthed) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (pathname.startsWith(ADMIN_PREFIX) && role !== 'admin') {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (pathname.startsWith(STAFF_PREFIX) && !(role === 'staff' || role === 'admin')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

function getCookie(all: string, name: string): string | undefined {
  const m = all.match(new RegExp('(?:^|; )' + name.replace(/([.$?*|{}()\[\]\\+^])/g, '\\$1') + '=([^;]*)'));
  return m ? decodeURIComponent(m[1]) : undefined;
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/staff/:path*',
  ]
};


