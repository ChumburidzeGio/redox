import { withAuth } from "next-auth/middleware"

console.log('_ NEXTAUTH_SECRET', process.env.NEXTAUTH_SECRET)

export default withAuth({
    pages: {
        signIn: '/auth/signin',
        error: '/auth/error',
    },
})
