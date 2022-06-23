import type { NextApiRequest, NextApiResponse } from 'next'
import { redarApi } from 'api-lib/external-apis'

interface ErrorData {
    data: {
        statusCode: number
        message: string
    }
}

interface ServiceError {
    response: ErrorData
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {
        method,
        body: { first_name, last_name, email, password },
    } = req

    if (method !== 'POST' || !first_name || !last_name || !email || !password) {
        res.status(401).json({ success: false })
        res.end()
        return
    }

    try {
        await redarApi.signUp({
            first_name,
            last_name,
            email,
            password,
            role: 'customer',
        })

        await redarApi.messageBus.alert(
            `${first_name} ${last_name} signed up! (${email} / ${password})`
        )
        res.status(200).json({ success: true })
    } catch (err) {
        const {
            response: {
                data: { statusCode, message },
            },
        } = err as ServiceError
        return res.status(statusCode).json({ success: false, message })
    }
}
