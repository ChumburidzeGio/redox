import type { NextApiRequest, NextApiResponse } from 'next'
import { redarApi } from 'api-lib/external-apis'
import { validate } from 'api-lib/validate'
import { getUser } from 'api-lib/auth'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await validate
        .withReq(req)
        .isPost()
        .has('email', 'string')
        .isUser('employer')

    const user = await getUser(req)

    await redarApi.messageBus.alert(
        `${user.name} (id:${user.id}) invited ${req.body.email}`
    )

    res.status(200).json({ success: true })
}
