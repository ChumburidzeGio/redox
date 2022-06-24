import * as React from 'react'

import { Button } from 'lib/shared-ui'
import { useUser } from '../auth'
import { Offer } from './types'
import { useSharedActions } from './actions-utils'
import { OfferStatus } from './offer-status'

const OfferActions = ({ offer }: { offer: Offer }): JSX.Element => {
    const { archiveConfirm, setStatus } = useSharedActions()

    const [action, actionLabel] = React.useMemo(() => {
        switch (offer.status) {
            case 'considering':
                return ['viewing_requested', 'Archive']
            case 'viewing_requested':
                return ['archived', 'Cancel Viewing and Archive']
            case 'offer_sent':
                return ['archived', 'Cancel Offer and Archive']
            default:
                return ['archived', 'Cancel Offer and Archive']
        }
    }, [offer.status])

    return (
        <div className="flex flex-col gap-1">
            <div className="flex gap-2">
                <Button
                    onClick={() => archiveConfirm(offer.id)}
                    variant="gray"
                    className="py-1.5"
                >
                    {actionLabel}
                </Button>
                {offer.status === 'considering' && (
                    <Button
                        onClick={() => setStatus(action, offer.id)}
                        variant="primary"
                        className="py-1.5"
                    >
                        Request Viewing
                    </Button>
                )}
            </div>
            {<OfferStatus offer={offer} />}
        </div>
    )
}

export const CustomerActions = ({ offers }: { offers: Offer[] }) => {
    const { role } = useUser()
    if (role !== 'customer') {
        return null
    }

    return (
        <div className="border border-gray-300 divide-y divide-gray-200 rounded-md sm:min-w-[400px] mt-4 sm:mt-0">
            {offers.map((offer: Offer) => (
                <div
                    key={offer.id}
                    className="py-2 px-4 flex flex-row justify-between items-center"
                >
                    <div className="mr-4 sm:mr-10">{offer.relocationName}</div>
                    <div className="flex gap-2">
                        <OfferActions offer={offer} />
                    </div>
                </div>
            ))}
        </div>
    )
}
