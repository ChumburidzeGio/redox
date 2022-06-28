import * as React from 'react'
import { RelocationTasks } from 'lib/relocations'
import { Header } from '../shared-ui'
import { useQuery } from 'react-query'
import api from 'lib/api'
import { PropertiesList } from '../properties'
import { useUser } from 'lib/auth'
import LoadingState from './loading-state'

export const CustomerDashboard: React.FC = () => {
    const { firstName } = useUser()

    const { data, isError, isLoading } = useQuery('homes', api.home.loadHomes, {
        refetchOnWindowFocus: false,
    })

    if (isLoading) {
        return <LoadingState />
    }

    if (
        isError ||
        !data?.data?.homes ||
        !data?.data?.relocation ||
        !data?.data?.relocation.tasks
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
                    <Header level="3" className="mb-4 mt-3">
                        Your Apartments
                    </Header>
                    <PropertiesList data={data?.data} />
                </div>
                <div className="flex sm:col-span-1 flex-col">
                    <Header level="4" className="mb-3 mt-3">
                        Your Relocation Progress
                    </Header>
                    <RelocationTasks tasks={data?.data?.relocation.tasks} />
                </div>
            </div>
        </div>
    )
}
