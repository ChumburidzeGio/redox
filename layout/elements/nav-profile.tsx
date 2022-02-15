import { useSession, signIn } from "next-auth/react"
import Link from "next/link"

export const NavProfile = () => {
  const { data: session } = useSession()

  if (!session) {
    return (<button onClick={() => signIn()}>Sign in</button>)
  }

  return (
      <Link href="/auth/profile" passHref>
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
