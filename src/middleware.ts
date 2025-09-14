import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify, JWTPayload } from 'jose';

export default async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  // Protect /admin routes
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (!token) {
      console.log('No token found, redirecting to /login');
      return NextResponse.redirect(new URL('/login', request.url));
    }

    try {
      if (!process.env.JWT_SECRET) throw new Error('JWT_SECRET not set');

      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const {
        payload,
      }: { payload: JWTPayload & { role?: string; id?: string } } =
        await jwtVerify(token, secret);

      // Check if the user is admin
      if (payload.role !== 'Admin') {
        console.log('Unauthorized, not an admin. Redirecting to /');
        return NextResponse.redirect(new URL('/', request.url));
      }

      request.headers.set('x-user-id', payload.id ?? '');
      request.headers.set('x-user-role', payload.role ?? '');
      console.log('JWT valid, admin user id:', payload.id);
    } catch (err) {
      console.log('JWT verification failed, redirecting to /login', err);
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  // Redirect logged-in users away from /login and /register
  if (
    request.nextUrl.pathname.startsWith('/login') ||
    request.nextUrl.pathname.startsWith('/register')
  ) {
    if (token) {
      console.log('User already logged in, redirecting to /');
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

// Apply middleware to /admin, /login, and /register
export const config = {
  matcher: ['/admin/:path*', '/login/:path*', '/register/:path*'],
};
