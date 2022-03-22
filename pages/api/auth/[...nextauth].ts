import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { externalApis } from "lib/api";

const users = [
  {
    role: 'admin',
    email: 'giorgi@relocify.nl',
    password: '16111995'
  },
  {
    role: 'admin',
    email: 'gulce@relocify.nl',
    password: '18121994'
  },
  {
    role: 'admin',
    email: 'thessa@relocify.nl',
    password: '08031996'
  },
  {
    role: 'admin',
    email: 'davit@relocify.nl',
    password: '10061995'
  },
  {
    role: 'client',
    email: 'odbc@yandex.ru', // Sergey Simonyan
    password: '02031986'
  },
  {
    role: 'client',
    email: 'benno.deysel@gmail.com', // Benno Deysel
    password: '02041981'
  },
  {
    role: 'client',
    email: 'theanad@gmail.com', // Theana Deysel
    password: '28011981'
  },
  {
    role: 'client',
    email: 'kronolynx@gmail.com', // Johann Grisales
    password: '24061982'
  },
  {
    role: 'client',
    email: 'updatedsapiens@gmail.com', // Roxana Manu
    password: '10121981'
  },
  {
    role: 'client',
    email: 'ilyas9406@yandex.ru', // Ilya Surkov
    password: '02011994'
  },
  {
    role: 'client',
    email: 'luilui312@gmail.com', // Luisa Paz Perez
    password: '03121986'
  }
]

export default NextAuth({
  debug: true,
  pages: {
    signIn: '/auth/signin',
    error: '/auth/signin'
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      // The credentials is used to generate a suitable form on the sign in page.
      // You can specify whatever fields you are expecting to be submitted.
      // e.g. domain, username, password, 2FA token, etc.
      // You can pass any HTML attribute to the <input> tag through the object.
      credentials: {
        email: { type: "email" },
        password: {  type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        const user = await externalApis.redarApi.signIn({
          email: credentials?.email!,
          password: credentials?.password!
        })
  
        if (user.data) {
          return user.data
        }

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
