import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createMiddlewareClient({ req: request, res: response })

  // Refresh session if expired
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Protect dashboard routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!session) {
      return NextResponse.redirect(new URL('/sign-in', request.url))
    }
  }

  // Redirect to dashboard if already logged in and trying to access auth pages
  if (request.nextUrl.pathname.startsWith('/sign-in') ||
      request.nextUrl.pathname.startsWith('/sign-up')) {
    if (session) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return response
}

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
}
