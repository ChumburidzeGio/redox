import * as React from 'react'
import { GiftIcon } from '@heroicons/react/outline'
import Router from 'next/router'

import { AppLayout } from 'lib/layouts'
import { Header } from 'lib/shared-ui'
import { EmployeesList } from 'lib/employees-list'
import { useLogOnRender } from '../../lib/analytics'

export function CustomerDashboard() {
    useLogOnRender('redox:view', {
        page: 'customer-dashboard',
    })

    const redirectToAffiliate = () => {
        Router.push('/customers/affiliate')
    }

    return (
        <div
            onClick={redirectToAffiliate}
            className="flex cursor-pointer border-[#ef4444] p-6 gap-4 bg-[#fff6f7] border-[2px] rounded  items-center md:justify-between mt-5"
        >
            <GiftIcon
                style={{
                    minWidth: '40px',
                    maxWidth: '40px',
                }}
                color="#ef4444"
            />
            <div className="text-sm sm:text-base">
                Do you know someone who might need a help with the relocation?
                Invite them to the app, receive €100 bonus and give them €50
                discount on any of our packages
            </div>
        </div>
    )
}

export default CustomerDashboard
