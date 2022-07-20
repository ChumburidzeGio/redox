import type { NextApiRequest, NextApiResponse } from 'next'
import { proxyRequest } from 'api-lib/external-apis'
import { getUser } from 'api-lib/auth'
import { validate } from 'api-lib/validate'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await validate.withReq(req).isPost().isUser()

    const user = await getUser(req)

    const request = await proxyRequest('POST', '/auth/reset', req.body, user)
    res.status(request.status).json(request.json)
    res.end()
}
