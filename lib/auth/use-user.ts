import { useSession } from 'next-auth/react'
import * as React from 'react'

export function useUser() {
    const { data: session, status } = useSession()
    const name = session?.user?.name || ''
    const firstName = React.useMemo(() => name.split(' ')[0] || '', [name])

    return {
        isAuth: status === 'authenticated',
        isLoading: status === 'loading',
        name,
        firstName,
        email: session?.user?.email || undefined,
        role: session?.role,
    }
}
