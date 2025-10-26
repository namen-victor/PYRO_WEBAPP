import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define protected routes and their required roles
const protectedRoutes = {
  '/admin': ['admin'],
  '/staff': ['staff', 'admin'],
  '/dashboard': ['client', 'staff', 'admin'], // Add other roles as needed
};

// Public routes that don't require authentication
const publicRoutes = [
  '/',
  '/about',
  '/contact',
  '/pricing',
  '/faq',
  '/terms',
  '/privacy',
  '/login',
  '/signup',
  '/forgot-password',
];

/**
 * Middleware to protect routes based on authentication and roles
 * This runs on the Edge Runtime before the page is rendered
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (publicRoutes.includes(pathname) || pathname.startsWith('/api/')) {
    return NextResponse.next();
  }

  // Get the authentication cookie
  const authToken = request.cookies.get('__session');
  const userRole = request.cookies.get('user_role');

  // Check if this is a protected route
  const isProtectedRoute = Object.keys(protectedRoutes).some(route => 
    pathname.startsWith(route)
  );

  if (!isProtectedRoute) {
    // For non-protected but auth-required routes, pass through
    return NextResponse.next();
  }

  // If no auth token and it's a protected route, redirect to login
  if (!authToken) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Check role-based access
  if (userRole) {
    for (const [route, allowedRoles] of Object.entries(protectedRoutes)) {
      if (pathname.startsWith(route)) {
        if (!allowedRoles.includes(userRole.value)) {
          // User doesn't have required role, redirect to appropriate page
          if (userRole.value === 'client') {
            return NextResponse.redirect(new URL('/dashboard', request.url));
          } else if (userRole.value === 'staff') {
            return NextResponse.redirect(new URL('/staff/dashboard', request.url));
          } else {
            return NextResponse.redirect(new URL('/login?error=unauthorized', request.url));
          }
        }
      }
    }
  }

  return NextResponse.next();
}

// Configure which routes to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - static files (.*\\..*)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*).*)',
  ],
};

