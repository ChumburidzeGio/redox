import * as React from 'react'

import { Button } from 'lib/shared-ui'
import { useUser } from 'lib/auth'
import { Offer } from './types'
import { Popover } from './popover'
import { useSharedActions } from './actions-utils'
import { OfferStatus } from './offer-status'

export const AgentActions = ({ offers }: { offers: Offer[] }) => {
    const { role } = useUser()
    const { archiveConfirm, setStatus } = useSharedActions()

    if (role !== 'admin') {
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
                        <div className="flex flex-col gap-1">
                            <div className="flex gap-2">
                                <Button
                                    onClick={() => archiveConfirm(offer.id)}
                                    variant="gray"
                                    className="py-1.5"
                                >
                                    Archive
                                </Button>
                                <Popover
                                    updateHandler={setStatus}
                                    offer={offer}
                                />
                            </div>
                            {<OfferStatus offer={offer} />}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
