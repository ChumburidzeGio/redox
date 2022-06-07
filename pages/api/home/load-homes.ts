import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import externalApi from 'lib/api/external'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getSession({ req })

    if (req.method !== 'POST' || !session) {
        res.end()
        return
    }

    try {
        if (session.role !== 'admin') {
            const relocation = await externalApi.redarApi.relocation.getForUser(
                session.user_id as number
            )
            const status = [
                'considering',
                'viewing_requested',
                'offer_sent',
                'rented',
            ]
            const { id } = relocation.data
            const { data } = await externalApi.redarApi.home.loadHomes(
                status,
                id
            )
            res.status(200).json(data)
        } else {
            const status = [
                null,
                'considering',
                'viewing_requested',
                'offer_sent',
                'rented',
            ]
            const { data } = await externalApi.redarApi.home.loadHomes(status)
            res.status(200).json(data)
        }
    } catch (e) {
        console.error(e)
        return e
    }

    res.end()
}
