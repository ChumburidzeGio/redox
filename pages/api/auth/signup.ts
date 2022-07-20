import type { NextApiRequest, NextApiResponse } from 'next'
import { proxyRequest } from 'api-lib/external-apis'
import { validate } from 'api-lib/validate'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await validate.withReq(req).isPost().isGuest()

    const request = await proxyRequest('POST', '/auth/sign-up', req.body)
    res.status(request.status).json(request.json)
    res.end()
}
