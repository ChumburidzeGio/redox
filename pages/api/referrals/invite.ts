import type { NextApiRequest, NextApiResponse } from 'next'
import { validate } from 'api-lib/validate'
import { redarApi } from 'api-lib/external-apis'
import { getUser } from 'api-lib/auth'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await validate
        .withReq(req)
        .isPost()
        .has('email', 'string')
        .isUser('customer')
    const user = await getUser(req)

    await redarApi.messageBus.alert(
        `${user.name} (${user.id}) referred ${req.body.email}`
    )

    res.status(200).json({ success: true })
}
