import * as React from 'react'
import { RelocationTasks } from 'lib/relocations'
import Link from 'next/link'
import { Header } from '../shared-ui'
import { useQuery } from 'react-query'
import api from 'lib/api'
import { HomeTabs, PropertiesList, EmptyState } from '../properties'
import { useUser } from 'lib/auth'
import LoadingState from './loading-state'
import { GiftIcon } from '@heroicons/react/outline'

const Referrals = () => (
    <Link href="/referrals" passHref>
        <a className="flex items-center bg-red-50 rounded border border-red-500 p-4 mt-5 bg-opacity-20">
            <GiftIcon className="flex h-10 w-12 sm:w-36 text-red-500 mr-4" />
            <div className="flex text-sm text-gray-900">
                Is your friend moving to Amsterdam? Invite to the app, get €100
                and give them €50 discount.
            </div>
        </a>
    </Link>
)

export const CustomerDashboard: React.FC = () => {
    const { firstName } = useUser()
    const [tabId, setTabId] = React.useState('all')

    const { data, isError, isLoading } = useQuery(
        ['homes', tabId],
        () => api.home.loadHomes(tabId),
        {
            refetchOnWindowFocus: false,
        }
    )

    if (
        !isLoading &&
        (isError ||
            !data?.data?.homes ||
            !data?.data?.relocation ||
            !data?.data?.relocation.tasks)
    ) {
        return (
            <div>
                Something went wrong, please refresh this page or contact
                support.
            </div>
        )
    }

    return (
        <div className="mx-1">
            <div className="md:flex md:items-center md:justify-between mt-5">
                <div className="flex-1 min-w-0">
                    <Header level="1">Welcome {firstName} 👋</Header>
                </div>
            </div>

            <div className="grid sm:grid-cols-3 gap-12 mt-4 sm:mt-4">
                <div className="flex sm:col-span-2 flex-col">
                    <HomeTabs onChange={setTabId} />
                    {isLoading ? (
                        <LoadingState />
                    ) : data?.data?.success && data.data.homes.length > 0 ? (
                        <PropertiesList data={data?.data} />
                    ) : (
                        <EmptyState />
                    )}
                </div>
                <div className="flex sm:col-span-1 flex-col">
                    <Header level="4" className="mb-3 mt-3">
                        Your Relocation Progress
                    </Header>
                    {data?.data?.relocation.tasks && (
                        <RelocationTasks tasks={data?.data?.relocation.tasks} />
                    )}
                    <Referrals />
                </div>
            </div>
        </div>
    )
}
