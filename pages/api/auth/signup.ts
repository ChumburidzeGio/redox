import type { NextApiRequest, NextApiResponse } from 'next'
import externalApi from 'lib/api/external'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (
        req.method !== 'POST' ||
        !req.body.email ||
        !req.body.first_name ||
        !req.body.last_name ||
        !req.body.password
    ) {
        res.status(401).json({ success: false })
        res.end()
        return
    }

    await externalApi.redarApi.messageBus.alert(
        `${req.body.first_name} ${req.body.last_name} signed up! (${req.body.email} / ${req.body.password})`
    )
    res.status(200).json({ success: true })
}