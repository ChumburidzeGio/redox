import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import externalApis from "lib/api/external";

export default NextAuth({
  debug: true,
  pages: {
    signIn: '/auth/signin',
    error: '/auth/signin'
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      // Left mostly for typing purposes (code in `authorize` inherits type from here)
      credentials: {
        email: { type: "email" },
        password: {  type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          const user = await externalApis.redarApi.signIn({
            email: credentials?.email!,
            password: credentials?.password!
          })

          if (user.data) {
            return user.data
          }
        } catch (e) {}

        return null
      }
    })
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.role = user?.role
      }
      return token
    },
    async session({ session, token }) {
      session.role = token.role
      return session
    }
  }
})
