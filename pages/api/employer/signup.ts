import type { NextApiRequest, NextApiResponse } from 'next'
import { redarApi } from 'api-lib/external-apis'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method !== 'GET' || !req.query.email) {
        res.status(404).json({ success: false })
        res.end()
        return
    }

    await redarApi.messageBus.alert(`Employer: New signup ${req.query.email}`)
    res.redirect('https://www.relocify.nl/companies/signed-up')
}
