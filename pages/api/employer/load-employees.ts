import type { NextApiRequest, NextApiResponse } from 'next'
import { redarApi } from 'api-lib/external-apis'
import { formatRelocation } from 'api-lib/relocations'
import { validate } from 'api-lib/validate'
import { getUser } from 'api-lib/auth'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await validate.withReq(req).isGet().isUser('employer')

    const user = await getUser(req)

    try {
        const userData = await redarApi.users.id(user.id)

        const { role, employerId } = userData.data
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
