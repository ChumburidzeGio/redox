import * as React from 'react'

import { Offer } from './types'
import { useStatusLabel } from './actions-utils'

export const OfferPreview = ({ offer }: { offer: Offer }) => {
    const statusLabel = useStatusLabel(offer)

    return (
        <li className="px-4 py-2 flex flex-row text-sm">
            <div className="font-medium text-gray-700">
                {offer.relocationName}
            </div>
            <div className="ml-4 text-gray-700">{statusLabel}</div>
        </li>
    )
}
