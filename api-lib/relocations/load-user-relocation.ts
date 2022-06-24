import { redarApi } from 'api-lib/external-apis'
import { handleAxiosError } from '../handle-error'
import { formatRelocation } from './format-relocation'
import { ExternalRelocation } from './types'

export async function loadUserRelocation(userId: number) {
    try {
        const { data }: { data: ExternalRelocation } =
            await redarApi.relocation.getForUser(userId)

        return formatRelocation(data)
    } catch (e) {
        handleAxiosError('home/load-homes', e)
        return null
    }
}
