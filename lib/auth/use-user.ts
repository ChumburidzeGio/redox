import { useSession } from 'next-auth/react'

export function useUser() {
    const { data: session, status } = useSession()


    console.log(useSession(),'vax')
    return {
        isAuth: status === 'authenticated',
        isLoading: status === 'loading',
        name: session?.user?.name || undefined,
        email: session?.user?.email || undefined,
        role: session?.role,
        isNewUser: session?.isNewUser
    }
}
