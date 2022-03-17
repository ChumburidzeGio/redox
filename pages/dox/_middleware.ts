import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/signin",
    // newUser: "/auth/signup",
    error: "/error",
  },
});
