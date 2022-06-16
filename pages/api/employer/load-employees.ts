import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { redarApi } from 'api-lib/external-apis'
import { formatRelocation } from 'api-lib/relocations'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getSession({ req })

    if (req.method !== 'GET' || !session) {
        res.end()
        return
    }

    try {
        const user = await redarApi.users.id(session.user_id as number)

        const { role, employerId } = user.data
        if (role !== 'employer' || !employerId) {
            res.end()
            return
        }

        const relocations = await redarApi.employer.relocations(employerId)

        res.status(200).json(relocations.data.map(formatRelocation))
    } catch (e) {
        console.error(e)
    }

    res.end()
}
