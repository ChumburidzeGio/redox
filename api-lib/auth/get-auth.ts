import { getSession } from 'next-auth/react'
import { NextApiRequest } from 'next'

export type UserRole = 'admin' | 'customer' | 'employer'

interface GetAuthReturn {
    id: number
    role: UserRole
    email: string
    name: string
}

export async function getAuth(req: NextApiRequest) {
    const session = await getSession({ req })

    if (!session) {
        return null
    }

    return {
        id: session!.user_id as number,
        role: session!.role as UserRole,
        email: session!.email as string,
        name: session!.user?.name as string,
    }
}

export async function getUser(req: NextApiRequest): Promise<GetAuthReturn> {
    return (await getAuth(req)) as never as Promise<GetAuthReturn>
}
