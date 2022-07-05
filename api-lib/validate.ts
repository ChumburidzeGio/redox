import type { NextApiRequest } from 'next'
import { getAuth } from './auth'

type Roles = 'admin' | 'customer' | 'employer'
type FieldTypes = 'string' | 'number'

function expect(condition: boolean, description: string) {
    if (!condition) {
        throw Error(`Validation Error: "${description}"`)
    }
}

function checkType<T>(
    value: T,
    name: string,
    type: FieldTypes,
    typeCheck: (value: T) => boolean,
    isOptional: boolean
) {
    if (isOptional && value === undefined) {
        return
    }

    expect(
        typeCheck(value),
        `${name} should be a ${type} but is ${typeof value}`
    )
}

function expectField(
    value: string | number,
    name: string,
    type: FieldTypes,
    isOptional: boolean
) {
    if (type === 'string') {
        checkType(
            value,
            name,
            type,
            (val) => typeof val === 'string',
            isOptional
        )
    }

    if (type === 'number') {
        checkType(value, name, type, (val) => Number.isFinite(val), isOptional)
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
