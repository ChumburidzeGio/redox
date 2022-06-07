import { NextResponse } from 'next/server'
import type { NextMiddleware } from 'next/server'
import config from '../config'
import { getToken } from 'next-auth/jwt'

const guestRoutes = ['/auth/signin', '/auth/signup', '/auth/error']

export const middleware: NextMiddleware = async (req: any) => {
    const session = await getToken({ req })
    const path = req.nextUrl.pathname

    if (!session && !guestRoutes.includes(path) && !path.startsWith('/api')) {
        return NextResponse.redirect(config.baseUrl + 'auth/signin')
    }

    if (session && guestRoutes.includes(path)) {
        return NextResponse.redirect(config.baseUrl)
    }

    return NextResponse.next()
}