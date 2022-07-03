import type { NextApiRequest, NextApiResponse } from 'next'

import { redarApi } from 'api-lib/external-apis'
import { getUser } from 'api-lib/auth'
import { validate } from 'api-lib/validate'

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

    const content = `We successfully received the email address (${user.email}) of your employee and in a bit we will invite them to our platform.`
    const title = `Thanks for inviting ${req.body.email}`

    await redarApi.messageBus.email({
        title,
        preview: content,
        recipient: user.email,
        content,
    })

    await redarApi.messageBus.email({
        title,
        preview: content,
        recipient: req.body.email,
        content,
    })

    res.status(200).json({ success: true })
}
