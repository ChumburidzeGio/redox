import type { NextApiRequest, NextApiResponse } from 'next'
import { redarApi } from 'api-lib/external-apis'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {
        method,
        body: { firstName, lastName, email, password },
    } = req

    if (method !== 'POST' || !firstName || !lastName || !email || !password) {
        res.status(401).json({ success: false })
        res.end()
        return
    }

    const signup = await redarApi.signUp({
        firstName,
        lastName,
        email,
        password,
        role: 'customer',
    })

    if (signup.data.success) {
        await redarApi.messageBus.alert(
            `${firstName} ${lastName} signed up! (${email} / ${password})`
        )
    }

    res.status(200).json(signup.data)
    res.end()
}
