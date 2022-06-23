import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { redarApi } from 'api-lib/external-apis'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getSession({ req })

    if (req.method !== 'POST' || !session || !req.body.email) {
        res.status(401).json({ success: false })
        res.end()
        return
    }

    const userId = session.user_id as number
    const userName = session.user?.name

    await redarApi.messageBus.alert(
        `${userName} (id:${userId}) invited ${req.body.email}`
    )
    res.status(200).json({ success: true })
}
