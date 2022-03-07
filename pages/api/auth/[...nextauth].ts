import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"

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
    newUser: '/auth/new-user'
  },
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
