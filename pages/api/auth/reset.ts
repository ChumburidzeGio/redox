import type { NextApiRequest, NextApiResponse } from 'next'
import { redarApi } from 'api-lib/external-apis'
import { getAuth } from 'api-lib/auth'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const auth = await getAuth(req)
    const { oldPassword, newPassword } = req.body

    if (req.method !== 'POST' || !auth || !oldPassword || !newPassword) {
        res.status(401).json({ success: false })
        res.end()
        return
    }

    const response = await redarApi.users.resetPassword(
        auth.id,
        oldPassword,
        newPassword
    )

    res.status(200).json(response.data)
}
