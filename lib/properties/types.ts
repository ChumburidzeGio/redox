export interface CoordinatesDts {
    lat: number
    lng: number
}

export interface PropertyDts {
    id: number
    photo: string
    street: string
    city: string
    postcode: string
    rent: string
    surface: number
    publisher: string
    isNew: boolean
    rooms: number
    furnishing: string | null
    availability: string | null
    url: string
    source: string
    coordinates: CoordinatesDts
}
