export interface SearchProfile {
    id: number
    relocationName: string
    districtsInclude: string[]
    priceMax: number
    priceMin: number
    surfaceMin: number | null
    roomsMin: number | null
    interior: string[] | null
    type: string[] | null
    active: boolean
}
