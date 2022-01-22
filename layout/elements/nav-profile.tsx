import { useSession, signIn } from "next-auth/react"
import Link from "next/link"

export const NavProfile = () => {
  const { data: session } = useSession()
  if (session) {
    return (
      <Link href="/settings" passHref>
        <a>
          {session.user?.image && <img
            className="h-8 w-8 rounded-full"
            src={session.user?.image}
            alt=""
          />}
        </a>
      </Link>
    )
  }

  return (
    <>
      <button onClick={() => signIn()}>Sign in</button>
    </>
  )
}
