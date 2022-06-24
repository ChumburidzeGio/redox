import * as _ from 'lodash'
import { ExternalHomeWithOffers } from './types'

function filterHomes(homes: ExternalHomeWithOffers[], isCustomer: boolean) {
    if (!isCustomer) {
        return homes
    }

    const rented = homes.find((home) => home.offers[0].status === 'rented')

    return rented ? [rented] : homes
}

function getSource(externalId: string) {
    return externalId.split(':')[0]
}

function formatRent(rent: number) {
    return '€' + rent.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

export function formatHomes(
    rawHomes: ExternalHomeWithOffers[],
    isCustomer: boolean
) {
    return filterHomes(rawHomes, isCustomer).map(({ home, offers }) => ({
        offers: offers.map((offer) =>
            _.pick(offer, [
                'id',
                'status',
                'relocationName',
                'relocationId',
                'viewingAt',
            ])
        ),
        source: getSource(home.externalId),
        ..._.omit(home, ['externalId', 'updatedAt']),
        rent: formatRent(home.rent),
    }))
}
