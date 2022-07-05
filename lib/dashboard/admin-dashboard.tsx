import * as React from 'react'
import { Header } from '../shared-ui'
import { useQuery } from 'react-query'
import api from 'lib/api'
import { PropertiesList } from '../properties'
import { useUser } from 'lib/auth'
import LoadingState from './loading-state'

export const AdminDashboard: React.FC = () => {
    const { firstName } = useUser()

    const { data, isError, isLoading } = useQuery('homes', api.home.loadHomes, {
        refetchOnWindowFocus: false,
    })

    if (isLoading) {
        return <LoadingState />
    }

    if (isError || !data?.data?.homes) {
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
                    <Header level="3" className="mb-4 mt-3">
                        Properties
                    </Header>
                    <PropertiesList data={data?.data} />
                </div>
                <div className="flex sm:col-span-1 flex-col">
                    <Header level="3" className="mb-3 mt-3">
                        Active Relocations
                    </Header>
                    <p>
                        In the future here will be active relocations for
                        Admins.
                    </p>
                </div>
            </div>
        </div>
    )
}
