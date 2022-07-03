import type { NextApiRequest } from 'next'
import { getAuth } from './auth'

type Roles = 'admin' | 'customer' | 'employer'
type FieldTypes = 'string' | 'number'

function expect(condition: boolean) {
    if (!condition) {
        throw Error('Validation Error')
    }
}

function expectField(field: string | number, type: FieldTypes) {
    if (type === 'string') {
        expect(Boolean(field) && typeof field === 'string')
    }

    if (type === 'number') {
        expect(Boolean(field) && Number.isFinite(field))
    }
}

export class Validate {
    req: NextApiRequest | null = null

    withReq(req: NextApiRequest) {
        this.req = req
        return this
    }

    private getReq() {
        if (this.req === null) {
            throw Error('Validation should start with withReq method')
        }

        return this.req as NextApiRequest
    }

    isPost() {
        expect(this.getReq().method === 'POST')
        return this
    }

    isGet() {
        expect(this.getReq().method === 'GET')
        return this
    }

    has(field: string, type: FieldTypes) {
        expectField(this.getReq().body[field] as string, type)
        return this
    }

    async isUser(role?: Roles | Roles[]) {
        const session = await getAuth(this.getReq())
        expect(session !== null)

        if (role && typeof role === 'string') {
            expect(session?.role === role)
        }

        if (role && Array.isArray(role)) {
            role.map((r) => expect(session?.role === r))
        }

        return this
    }

    async isGuest() {
        const session = await getAuth(this.getReq())
        expect(session === null)
        return this
    }
}

export const validate = new Validate()
