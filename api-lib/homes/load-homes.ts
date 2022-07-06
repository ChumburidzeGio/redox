import { redarApi } from '../external-apis'
import { handleAxiosError } from '../handle-error'
import { ExternalHomeWithOffers } from './types'
import { formatHomes } from './format-homes'

function getStatuses(role: string, statusGroupId: string): (string | null)[] {
    if (statusGroupId === 'archived') {
        return ['archived']
    }

    const statuses = [
        'considering',
        'viewing_requested',
        'offer_sent',
        'rented',
    ]

    return role === 'admin' ? [...statuses, null] : statuses
}

export async function loadHomes(
    userRole: string,
    statusGroupId: string,
    relocationId?: number
) {
    const statuses = getStatuses(userRole, statusGroupId)

    try {
        const { data }: { data: ExternalHomeWithOffers[] } =
            await redarApi.home.loadHomes(statuses, relocationId)

        return formatHomes(data, userRole === 'customer')
    } catch (e) {
        handleAxiosError('home/load-homes', e)
        return []
    }
}
