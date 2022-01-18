import { useSession, signIn, signOut } from "next-auth/react"

export const NavProfile = () => {
  const { data: session } = useSession()
  if (session) {
    return (
      <>
        {session.user?.image && <img
          className="h-8 w-8 rounded-full"
          src={session.user?.image}
          alt=""
        />}
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}
