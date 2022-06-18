import * as React from 'react'
import { GiftIcon } from '@heroicons/react/outline'
import Router from 'next/router'

import { AppLayout } from 'lib/layouts'
import { InviteFriend } from 'lib/customers/invite'
import { useLogOnRender } from '../../lib/analytics'

export function CustomerDashboard() {
    useLogOnRender('redox:view', {
        page: 'customer-dashboard',
    })

    const redirectToAffiliate = () => {
        Router.push('/customers/affiliate')
    }

    return (
        <AppLayout>
            <div
                onClick={redirectToAffiliate}
                className="flex cursor-pointer items-center gap-2 mt-5"
            >
                <GiftIcon className="w-14 stroke-1" color="#ef4444" />
                <div className="text-4xl font-bold text-[#ef4444]">
                    Affiliate Program
                </div>
            </div>
            <div className="mt-5">
                Invite a friend, give them €50 discount on any of our packages
                and receive €100 bonus per invite
            </div>
            <InviteFriend />
        </AppLayout>
    )
}

export default CustomerDashboard
