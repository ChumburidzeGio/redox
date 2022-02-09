import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"

const users = [
  {
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
    role: 'client',
    email: 'john@acme.com',
    password: 'somepass'
  }
]

export default NextAuth({
  pages: {
    // signIn: '/auth/credentials-signin',
  },
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. "Sign in with...")
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { label: "Email", type: "email", placeholder: "john@acme.com" },
        password: {  label: "Password", type: "password" }
      },
      async authorize(credentials) {
        // Add logic here to look up the user from the credentials supplied
        const isUser = users.find(user => {
          return user.email === credentials?.email && user.password === credentials.password
        })
  
        if (isUser) {
          // Any object returned will be saved in `user` property of the JWT
          return isUser
        } else {
          // If you return null then an error will be displayed advising the user to check their details.
          return null
          
          // You can also Reject this callback with an Error thus the user will be sent to the error page with the error message as a query parameter        
        }
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
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
