import React from 'react'
import dayjs from 'dayjs'
import toast from 'react-hot-toast'

import { Offer } from './types'
import api from 'lib/api/internal'
import { useQueryClient } from 'react-query'

const useStatusLabel = (offer: Offer): string => {
    return React.useMemo(() => {
        switch (offer.status) {
            case 'considering':
                return 'Considering'
            case 'offer_sent':
                return 'Offer Sent'
            case 'viewing_requested':
                return offer.viewingAt
                    ? `Viewing at ${dayjs(offer.viewingAt).format(
                          'MMM D, HH:mm'
                      )}`
                    : 'Viewing Requested'
            case 'rented':
                return 'Rented'
            default:
                return 'No Status'
        }
    }, [offer.status, offer.viewingAt])
}

function useSharedActions() {
    const queryClient = useQueryClient()
    async function archiveConfirm(id: number) {
        if (confirm('Are you sure you want to archive property?')) {
            try {
                await api.home.setOfferStatus('archived', id)
                await queryClient.refetchQueries('homes')
                toast.success('Successfully archived the property')
            } catch (err) {
                toast.error(
                    'Oops we broke something, please try again later or if error persists let us know in the chat.'
                )
            }
        }
    }

    async function setStatus(status: string | null, id: number, date?: string) {
        try {
            await api.home.setOfferStatus(status, id, date)
            await queryClient.refetchQueries('homes')

            toast.success(
                date
                    ? 'Successfully updated the viewing time'
                    : 'Successfully updated the status'
            )
        } catch (err) {
            toast.error(
                'Oops we broke something, please try again later or if error persists let us know in the chat.'
            )
        }
    }

    return { archiveConfirm, setStatus }
}

export { useSharedActions, useStatusLabel }
