import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'


export function middleware(request: NextRequest) {
    if (!request.cookies.get("token") && !request.nextUrl.pathname.startsWith('/auth') && !request.nextUrl.pathname.includes('/_next')) {
        return NextResponse.redirect(new URL('/auth?action=login', request.url))
    }
}