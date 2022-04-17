import { withAuth } from "next-auth/middleware"

export function middleware(req: any) {
    return withAuth(req, {
        pages: {
            signIn: '/auth/signin',
        },
    });
}
