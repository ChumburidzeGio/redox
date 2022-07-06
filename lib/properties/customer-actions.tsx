import * as React from 'react'

import { Button, classNames } from 'lib/shared-ui'
import { ThumbDownIcon, ThumbUpIcon, RefreshIcon } from '@heroicons/react/solid'
import { useUser } from '../auth'
import { Offer } from './types'
import { useSharedActions, useStatusLabel } from './actions-utils'

const OfferActions = ({ offer }: { offer: Offer }): JSX.Element => {
    const { archiveConfirm, setStatus } = useSharedActions()
    const status = useStatusLabel(offer)

    const [actionLabel] = React.useMemo(() => {
        switch (offer.status) {
            case 'viewing_requested':
                return ['archived', 'Cancel Viewing and Archive']
            case 'offer_sent':
                return ['archived', 'Cancel Offer and Archive']
            default:
                return ['archived', 'Cancel Offer and Archive']
        }
    }, [offer.status])

    return (
        <div className="flex flex-col">
            <div
                className={classNames(
                    offer.status === 'considering' ||
                        offer.status === 'archived'
                        ? 'grid flex-row gap-2'
                        : 'flex'
                )}
            >
                {(offer.status === 'considering' ||
                    offer.status === 'archived') && (
                    <Button
                        onClick={() => setStatus('viewing_requested', offer.id)}
                        variant="green"
                        className={classNames(
                            offer.status === 'considering' ? '' : 'w-full'
                        )}
                    >
                        {offer.status === 'considering' ? (
                            <>
                                <ThumbUpIcon className="mr-2 h-5 w-5" /> Request
                                Viewing
                            </>
                        ) : (
                            <>
                                <RefreshIcon className="mr-2 h-5 w-5" /> Recover
                                and Request Viewing
                            </>
                        )}
                    </Button>
                )}

                {offer.status !== 'archived' && (
                    <Button
                        onClick={() => archiveConfirm(offer.id)}
                        variant={
                            offer.status === 'considering' ? 'red' : 'primary'
                        }
                        className={classNames(
                            offer.status === 'considering' ? '' : 'w-full'
                        )}
                    >
                        <ThumbDownIcon className="mr-2 h-5 w-5" /> {actionLabel}
                    </Button>
                )}
            </div>
            {offer.status !== 'considering' ? (
                <div className="text-sm text-gray-700 mt-1">
                    Current status:{' '}
                    <span className="font-semibold">{status}</span>
                </div>
            ) : null}
        </div>
    )
}

export const CustomerActions = ({ offers }: { offers: Offer[] }) => {
    const { role } = useUser()
    if (role !== 'customer') {
        return null
    }

    return (
        <div className="sm:min-w-[400px]">
            {offers.map((offer: Offer) => (
                <OfferActions key={offer.id} offer={offer} />
            ))}
        </div>
    )
}
