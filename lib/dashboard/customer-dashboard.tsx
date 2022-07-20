import * as React from 'react'
import Link from 'next/link'
import { Button, Header } from '../shared-ui'
import { useQuery } from 'react-query'
import api from 'lib/api'
import { HomeTabs, EmptyState } from '../homes'
import { useUser } from 'lib/auth'
import { GiftIcon, HomeIcon, ExternalLinkIcon } from '@heroicons/react/outline'

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

    const { data, isError, isLoading } = useQuery(['homes', tabId], () =>
        api.request.get('/home/load-homes?status=' + tabId)
    )

    if (!isLoading && (isError || !data?.data)) {
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
                    <EmptyState
                        Icon={HomeIcon}
                        title="Here will be soon list of rental offers"
                        description="For now please use the other app for accessing rental offers:"
                    >
                        <Button
                            variant="primary"
                            className="mt-4 px-6"
                            href="https://relocify.relocationonline.com/"
                            target="_blank"
                        >
                            Open App <ExternalLinkIcon className="h-5 ml-3" />
                        </Button>
                    </EmptyState>

                    {/*{isLoading ? (*/}
                    {/*    <LoadingState />*/}
                    {/*) : data?.data && data.data.length > 0 ? (*/}
                    {/*    <PropertiesList data={data?.data} />*/}
                    {/*) : (*/}
                    {/*    <EmptyState
                        Icon={HomeIcon}
                        title="Here will be the list of rental offers"
                        description="As soon as your case manager approves offers for you,
                        you will see them here."
                    />*/}
                    {/*)}*/}
                </div>
                <div className="flex sm:col-span-1 flex-col pt-8">
                    <Referrals />
                </div>
            </div>
        </div>
    )
}
