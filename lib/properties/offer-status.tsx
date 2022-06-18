import { Offer } from './types'
import { useStatusLabel } from './actions-utils'
import * as React from 'react'

export function OfferStatus({ offer }: { offer: Offer }) {
    const status = useStatusLabel(offer)
    return <div className="text-xs text-gray-700">{status}</div>
}
