import type { NextApiRequest, NextApiResponse } from 'next'
import { proxyRequest } from 'api-lib/external-apis'
import { getUser } from 'api-lib/auth'
import { validate } from 'api-lib/validate'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await validate.withReq(req).isGet().isUser(['admin'])
    const user = await getUser(req)

    const request = await proxyRequest(
        'GET',
        '/homes/search-profiles/index',
        req.query,
        user
    )

    res.status(request.status).json(request.json)
    res.end()
}
