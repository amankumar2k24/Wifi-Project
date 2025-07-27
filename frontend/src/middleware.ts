import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
    console.log("Middleware called");
    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    const { pathname } = req.nextUrl;

    const isAuthPage = pathname.startsWith('/auth');
    const isAdminPage = pathname.startsWith('/dashboard/admin');
    const isUserPage = pathname.startsWith('/dashboard/user');
    const isDashboardPage = pathname.startsWith('/dashboard');

    // 🧑‍💻 If token exists, user is authenticated
    if (token) {
        const role = token.role;
        console.log("User Role:", role);

        // Authenticated user visiting auth pages? Redirect to their dashboard
        if (isAuthPage) {
            if (role === 'ADMIN') {
                return NextResponse.redirect(new URL('/dashboard/admin', req.url));
            } else if (role === 'USER') {
                return NextResponse.redirect(new URL('/dashboard/user', req.url));
            }
        }

        // Admin-only access
        if (isAdminPage && role !== 'ADMIN') {
            return NextResponse.redirect(new URL('/dashboard/user', req.url));
        }

        // User-only access
        if (isUserPage && role !== 'USER') {
            return NextResponse.redirect(new URL('/dashboard/admin', req.url));
        }
    }

    // Not authenticated and trying to access dashboard? Redirect to login
    if (!token && isDashboardPage) {
        return NextResponse.redirect(new URL('/auth/login', req.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        '/auth/login',
        '/auth/register',
        '/auth/forgot-password',
        '/auth/reset-password',
        '/dashboard/:path*',
    ],
};
