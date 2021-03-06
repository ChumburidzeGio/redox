import NextAuth from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { proxyRequest } from 'api-lib/external-apis'

export default NextAuth({
    debug: true,
    pages: {
        signIn: '/auth/signin',
        error: '/auth/error',
    },
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            // Left mostly for typing purposes (code in `authorize` inherits type from here)
            credentials: {
                email: { type: 'email' },
                password: { type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null
                }

                try {
                    const request = await proxyRequest(
                        'POST',
                        '/auth/sign-in',
                        credentials
                    )

                    if (request.status === 201) {
                        return request.json
                    }

                    return null
                } catch (e) {}
                return null
            },
        }),
    ],
    callbacks: {
        async redirect({ url, baseUrl }) {
            return url.startsWith(baseUrl)
                ? Promise.resolve(url)
                : Promise.resolve(baseUrl)
        },
        async jwt({ token, account, user }) {
            if (account) {
                token.user_id = user?.id
                token.role = user?.role
            }
            return token
        },
        async session({ session, token }) {
            session.user_id = token.user_id
            session.role = token.role
            return session
        },
    },
})
