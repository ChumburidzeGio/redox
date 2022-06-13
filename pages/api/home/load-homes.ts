import type { NextApiRequest, NextApiResponse } from 'next'
import * as _ from 'lodash'
import { getSession } from 'next-auth/react'
import externalApi from 'lib/api/external'

interface ExternalHomeWithOffers {
    offers: {
        id: number
        relocationId: number
        status: string
        relocationName: string
    }[]
    home: {
        id: number
        externalId: string
        url: string
        rent: number
        street: string
        photo: string
        city: string
        postcode: string
        agency: string
        surface: number
        rooms: number
        interior: string
        availability: string
        coordinates: {
            lat: number
            lng: number
        }
        createdAt: string
        updatedAt: string
    }
}

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

function formatHomes(rawHomes: ExternalHomeWithOffers[], isCustomer: boolean) {
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

async function getHomeLoaderParams(
    role: string,
    userId: number
): Promise<{ statuses: (string | null)[]; id?: number }> {
    const statuses = [
        'considering',
        'viewing_requested',
        'offer_sent',
        'rented',
    ]

    if (role === 'admin') {
        return { statuses: [...statuses, null] }
    }

    const {
        data: { id },
    } = await externalApi.redarApi.relocation.getForUser(userId)

    return { statuses, id }
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const session = await getSession({ req })

    if (req.method !== 'POST' || !session) {
        res.end()
        return
    }

    try {
        const { id, statuses } = await getHomeLoaderParams(
            session.role as string,
            session.user_id as number
        )

        const { data }: { data: ExternalHomeWithOffers[] } =
            await externalApi.redarApi.home.loadHomes(statuses, id)

        res.status(200).json({
            success: true,
            homes: formatHomes(data, session.role === 'customer'),
        })
    } catch (e) {
        console.error(e)
        res.status(404).json({
            success: false,
        })
    }

    res.end()
}
