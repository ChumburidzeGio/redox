import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import externalApi from 'lib/api/external'
import type { ExternalRelocation } from 'api-lib/relocations'
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
        const user = await externalApi.redarApi.users.id(
            session.user_id as number
        )

        if (user.data.role !== 'employer' || !user.data.employerId) {
            res.end()
            return
        }

        const relocations = await externalApi.redarApi.employer.relocations(
            user.data.employerId
        )

        res.status(200).json(
            relocations.data.map((relocation: ExternalRelocation) => {
                return formatRelocation(relocation)
            })
        )
    } catch (e) {
        console.error(e)
    }

    res.end()
}
