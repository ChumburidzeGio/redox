export interface CoordinatesDts {
    lat: number
    lng: number
}

export type SearchOfferStatus =
    | null
    | 'considering'
    | 'viewing_requested'
    | 'archived'
    | 'offer_sent'
    | 'rented'

export type Home = {
    agency: string
    city: string
    id: number
    interior: string
    photo: string | null
    postcode: string | null
    availability: string
    source: string
    rent: string
    rooms: number
    street: string
    surface: number
    url: string
    offers?: Offer[]
    offer: Offer
    coordinates: CoordinatesDts
}

export interface Offer {
    id: number
    searchProfileId: number
    relocationId: number
    homeId: number
    status: SearchOfferStatus
    viewingAt: string
    createdAt: Date
    updatedAt: Date
    relocationName: string
}

export interface OfferOption {
    label: string
    value: string
    desc: string
}
