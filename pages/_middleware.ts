import { withAuth } from "next-auth/middleware"

export default withAuth({
    pages: {
        signIn: '/auth/signin',
    },
    callbacks: {
        authorized: ({ token, req }) => {
            const path = req.nextUrl.pathname
            const isGuest = !Boolean(token?.role)
            const isEmployer = token?.role === 'employer'
            const isCustomer = token?.role === 'customer'

            if (isCustomer && path.startsWith('/employer/')) {
                return false
            }

            if (isEmployer && path.startsWith('/dox/')) {
                return false
            }

            return !(isGuest && (
                path === '/' ||
                path === '/settings'
            ));
        }
    }
})
