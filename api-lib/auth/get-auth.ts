import { getSession } from 'next-auth/react'
import { NextApiRequest } from 'next'

export type UserRole = 'admin' | 'customer' | 'employer'

export async function getAuth(req: NextApiRequest) {
    const session = await getSession({ req })

    if (!session) {
        return null
    }

    return {
        id: session.user_id as number,
        role: session.role as UserRole,
    }
}
