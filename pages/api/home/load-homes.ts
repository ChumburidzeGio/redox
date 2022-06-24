import type { NextApiRequest, NextApiResponse } from 'next'
import { loadHomes } from 'api-lib/homes'
import { loadUserRelocation } from 'api-lib/relocations'
import { getAuth } from 'api-lib/auth'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const auth = await getAuth(req)

    if (
        req.method !== 'POST' ||
        !auth ||
        ['customer', 'admin'].indexOf(auth.role) < 0
    ) {
        res.end()
        return
    }

    if (auth.role === 'admin') {
        const homes = await loadHomes(auth.role)
        res.status(200).json({ success: true, homes })
        res.end()
        return
    }

    const relocation = await loadUserRelocation(auth.id)

    if (!relocation) {
        res.status(200).json({ success: false })
        return
    }

    const homes = await loadHomes(auth.role, relocation?.id)

    res.status(200).json({ success: true, homes, relocation })
    res.end()
}
