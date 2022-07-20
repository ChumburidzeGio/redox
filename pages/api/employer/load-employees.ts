import type { NextApiRequest, NextApiResponse } from 'next'
import { proxyRequest } from 'api-lib/external-apis'
import { validate } from 'api-lib/validate'
import { getUser } from 'api-lib/auth'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await validate.withReq(req).isGet().isUser('employer')
    const user = await getUser(req)

    const request = await proxyRequest(
        'GET',
        '/employer/employees',
        req.body,
        user
    )

    res.status(request.status).json(request.json)
    res.end()
}
