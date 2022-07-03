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
        .has('oldPassword', 'string')
        .has('newPassword', 'string')
        .isUser()

    const user = await getUser(req)

    const { oldPassword, newPassword } = req.body

    const response = await redarApi.users.resetPassword(
        user.id,
        oldPassword,
        newPassword
    )

    res.status(200).json(response.data)
}
