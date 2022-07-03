import type { NextApiRequest } from 'next'
import { getAuth } from './auth'

type Roles = 'admin' | 'customer' | 'employer'
type FieldTypes = 'string' | 'number'

function expect(condition: boolean, description: string) {
    if (!condition) {
        throw Error(`Validation Error: "${description}"`)
    }
}

function expectField(
    value: string | number,
    name: string | number,
    type: FieldTypes,
    isOptional: boolean
) {
    if (type === 'string') {
        expect(
            (isOptional ? true : Boolean(value)) && typeof value === 'string',
            `${name} ${isOptional ? '(optional)' : ''} should be a string`
        )
    }

    if (type === 'number') {
        expect(
            (isOptional ? true : Boolean(value)) && Number.isFinite(value),
            `${name} ${isOptional ? '(optional)' : ''} should be a number`
        )
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
        expect(this.getReq().method === 'POST', `request method should be POST`)
        return this
    }

    isGet() {
        expect(this.getReq().method === 'GET', `request method should be GET`)
        return this
    }

    has(field: string, type: FieldTypes) {
        expectField(this.getReq().body[field] as string, field, type, false)
        return this
    }

    hasOptional(field: string, type: FieldTypes) {
        expectField(this.getReq().body[field] as string, field, type, true)
        return this
    }

    async isUser(role?: Roles | Roles[]) {
        const session = await getAuth(this.getReq())
        expect(session !== null, `user should be logged in`)

        if (role && typeof role === 'string') {
            expect(session?.role === role, `role should be ${role}`)
        }

        if (role && Array.isArray(role)) {
            expect(
                role.some((r) => session?.role === r),
                `role should be ${role.join(' or ')} (current ${
                    session?.role
                }')`
            )
        }

        return this
    }

    async isGuest() {
        const session = await getAuth(this.getReq())
        expect(session === null, `user should not be logged in`)
        return this
    }
}

export const validate = new Validate()
