import { withAuth } from "next-auth/middleware"

export function middleware(req: any) {
    console.log(process.env.NEXTAUTH_URL, process.env.NEXTAUTH_SECRET);
    return withAuth(req, {
        pages: {
            signIn: '/auth/signin',
        },
        callbacks: {
            authorized: ({ token }) => !!token,
        },
    });
}
