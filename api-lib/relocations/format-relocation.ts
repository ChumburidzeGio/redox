import { CountryCode, ExternalRelocation } from './types'
import { countries } from 'countries-list'
import { formatTasks, tasksToProgress, timestampToDate } from './format-tasks'

function countryCodeToData(code: CountryCode) {
    const country = countries[code]
    return {
        name: country.name,
        emoji: country.emoji,
    }
}

export function formatRelocation(relocation: ExternalRelocation) {
    return {
        id: relocation.id,
        name: relocation.name,
        email: relocation.email,
        from: countryCodeToData(relocation.originCountry),
        createdAt: timestampToDate(relocation.createdAt),
        updatedAt: timestampToDate(relocation.updatedAt),
        completedAt: timestampToDate(relocation.completedAt),
        canceledAt: timestampToDate(relocation.canceledAt),
        progress: tasksToProgress(relocation.tasks),
        status: relocation.status,
        tasks: formatTasks(relocation.tasks),
    }
}
