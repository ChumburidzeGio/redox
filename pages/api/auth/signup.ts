import type { NextApiRequest, NextApiResponse } from 'next'
import { redarApi } from 'api-lib/external-apis'
import { validate } from 'api-lib/validate'

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    await validate
        .withReq(req)
        .isPost()
        .has('firstName', 'string')
        .has('lastName', 'string')
        .has('email', 'string')
        .has('password', 'string')
        .isGuest()

    const { firstName, lastName, email, password } = req.body

    const signup = await redarApi.signUp({
        firstName,
        lastName,
        email,
        password,
        role: 'customer',
    })

    if (signup.data.success) {
        await redarApi.messageBus.alert(
            `${firstName} ${lastName} signed up! (${email} / ${password})  ${req.body.pkg}`
        )
    }

    res.status(200).json(signup.data)
    res.end()
}
