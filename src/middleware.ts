import { NextRequest, NextResponse } from 'next/server'
import { PUBLIC_URL } from '@/src/config/url.config'

export async function middleware(request: NextRequest) {

	const sessionId = request.cookies.get('SessionId')?.value

	const isAuthPage = request.url.includes(PUBLIC_URL.auth())

	if (!sessionId) {
		new URL(PUBLIC_URL.auth(), request.url)
	}

	if (sessionId && isAuthPage) {
		new URL(PUBLIC_URL.home(), request.url)
	}

	return NextResponse.next()
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}