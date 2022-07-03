import type { NextApiRequest, NextApiResponse } from 'next'
import { loadHomes } from 'api-lib/homes'
import { loadUserRelocation } from 'api-lib/relocations'
import { getUser } from 'api-lib/auth'
import { validate } from 'api-lib/validate'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await validate
        .withReq(req)
        .isGet()
        .has('email', 'string')
        .isUser(['admin', 'customer'])

    const user = await getUser(req)

    if (user.role === 'admin') {
        const homes = await loadHomes(user.role)
        res.status(200).json({ success: true, homes })
        res.end()
        return
    }

    const relocation = await loadUserRelocation(user.id)

    if (!relocation) {
        res.status(200).json({ success: false })
        return
    }

    const homes = await loadHomes(user.role, relocation.id)

    res.status(200).json({ success: true, homes, relocation })
    res.end()
}
