export interface ExternalHomeWithOffers {
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
