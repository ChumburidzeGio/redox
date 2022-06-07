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

const GetCustomerStatusValue = (offer: Offer): string => {
    switch (offer?.status) {
        case 'considering':
            return 'viewing_requested'
        case 'viewing_requested':
            return 'archived'
        case 'offer_sent':
            return 'archived'
        default:
            return 'archived'
    }
}

function useSharedActions() {
    const queryClient = useQueryClient()
    async function archiveConfirm(id: number) {
        if (confirm('Are you sure you want to archive property?')) {
            try {
                await api.home.setOfferStatus('archived', id)
                await queryClient.refetchQueries('homes')
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
        } catch (err) {
            toast.error(
                'Oops we broke something, please try again later or if error persists let us know in the chat.'
            )
        }
    }

    return { archiveConfirm, setStatus }
}

export { GetCustomerStatusValue, useSharedActions, useStatusLabel }
