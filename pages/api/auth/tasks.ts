import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { redarApi } from 'api-lib/external-apis'
import { formatTasks } from 'api-lib/relocations'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getSession({ req })

    if (req.method !== 'GET' || !session || session.role !== 'customer') {
        res.status(401).json({ success: false })
        res.end()
        return
    }

    const { data: relocation } = await redarApi.relocation.getForUser(
        session.user_id as number
    )

    res.status(200).json({
        tasks: formatTasks(relocation.tasks),
    })
}
