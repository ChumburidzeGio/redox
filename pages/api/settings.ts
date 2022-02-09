import relocations from 'relocations'
import { getSession } from "next-auth/react"
import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const session = await getSession({ req })

    if (!session) {
        res.status(403)
        return
    }

    const user = relocations.find(relocation => relocation.email === session.user?.email)

    res.status(200).json({ success: true, user })
}
