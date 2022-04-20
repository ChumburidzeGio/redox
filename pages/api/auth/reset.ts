import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from "next-auth/react"
import externalApi from "lib/api/external";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const session = await getSession({ req })

    if (req.method !== 'POST' || !session || !req.body.oldPassword || !req.body.newPassword) {
        res.status(401).json({ success: false })
        res.end()
        return
    }

    const userId = session.user_id as number

    const response = await externalApi.redarApi.users.resetPassword(
        userId,
        req.body.oldPassword,
        req.body.newPassword
    )

    console.log(
        userId,
        req.body.oldPassword,
        req.body.newPassword
    )

    res.status(200).json(response.data)
}
