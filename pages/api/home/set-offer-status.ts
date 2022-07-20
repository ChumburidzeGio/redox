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
        .has('status', 'string')
        .hasOptional('date', 'string')
        .has('id', 'number')
        .isUser(['admin', 'customer'])

    const user = await getUser(req)

    try {
        const { status, id, date } = req.body
        const { data } = await redarApi.home.setOfferStatus(status, id, date)

        if (user.role !== 'admin') {
            await redarApi.messageBus.alert(
                `${user.name} (id:${user.id}) updated offer status (status id:${data.id}) to ${data.status}`
            )
        }

        res.status(200).json(data)
    } catch (e) {
        console.error(e)
        return e
    }
}
