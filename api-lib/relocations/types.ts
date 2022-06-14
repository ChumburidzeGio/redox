import { countries } from 'countries-list'

export type CountryCode = keyof typeof countries

export interface ExternalRelocation {
    id: number
    name: string
    email: string
    originCountry: CountryCode
    createdAt: string
    updatedAt: string | null
    canceledAt: string | null
    completedAt: string | null
    status: string
    tasks: {
        id: string
        status: string
        appointment: string
    }[]
}
