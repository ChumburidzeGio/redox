import type { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'

import externalApi from 'lib/api/external'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getSession({ req })

    const {
        method,
        body: { email },
    } = req

    if (method !== 'POST' || !session || !email) {
        res.status(401).json({ success: false })
        res.end()
        return
    }

    const userEmail = session.user?.email

    const content = `We successfully received the email address (${email}) of your employee and in a bit we will invite them to our platform.`
    const title = `Thanks for inviting ${email}`

    await externalApi.redarApi.messageBus.email({
        title,
        preview: content,
        recipient: userEmail as string,
        content,
    })

    await externalApi.redarApi.messageBus.email({
        title,
        preview: content,
        recipient: email,
        content,
    })

    res.status(200).json({ success: true })
}
