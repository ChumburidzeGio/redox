import * as React from 'react'

import { Button } from 'lib/shared-ui'
import { useUser } from '../auth'
import { Offer } from './types'
import {
    useStatusLabel,
    useSharedActions,
    GetCustomerStatusValue,
} from './actions-utils'

export const CustomerActions = ({ offers }: { offers: Offer[] }) => {
    const { role } = useUser()
    const { archiveConfirm, setStatus } = useSharedActions()

    const updateStatus = async (offer: Offer) => {
        const status = GetCustomerStatusValue(offer)
        await setStatus(status, offer.id)
    }

    function GetStatus({ offer }: { offer: Offer }) {
        const status = useStatusLabel(offer)
        return <div className="text-xs text-gray-700 ">{status}</div>
    }

    const getButtonContent = (status: string | null): string => {
        switch (status) {
            case 'considering':
                return 'Request Viewing'
            case 'viewing_requested':
                return 'Cancel Viewing and Archive'
            case 'offer_sent':
                return 'Cancel Offer and Archive'
            default:
                return 'Cancel Offer and Archive'
        }
    }

    const getActions = (offer: Offer): JSX.Element => {
        return (
            <div className="flex flex-col gap-1">
                <div className="flex gap-2">
                    {offer.status === 'considering' && (
                        <Button
                            onClick={() => archiveConfirm(offer.id)}
                            variant="gray"
                            className="py-1.5"
                        >
                            Archive
                        </Button>
                    )}
                    <Button
                        onClick={() => updateStatus(offer)}
                        variant="primary"
                        className="py-1.5"
                    >
                        {getButtonContent(offer.status)}
                    </Button>
                </div>
                {<GetStatus offer={offer} />}
            </div>
        )
    }

    if (role !== 'customer') {
        return null
    }

    return (
        <div className="border border-gray-300 divide-y divide-gray-200 rounded-md sm:min-w-[400px] mt-4 sm:mt-0">
            {offers?.map((offer: Offer) => (
                <div
                    key={offer.id}
                    className="py-2 px-4 flex flex-row justify-between items-center"
                >
                    <div className="mr-4 sm:mr-10">{offer.relocationName}</div>
                    <div className="flex gap-2">{getActions(offer)}</div>
                </div>
            ))}
        </div>
    )
}
