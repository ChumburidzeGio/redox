import * as React from 'react'
import { Header } from '../shared-ui'
import { useQuery } from 'react-query'
import api from 'lib/api'
import { PropertiesList } from '../properties'
import { useUser } from 'lib/auth'

export const AdminDashboard: React.FC = () => {
    const { firstName } = useUser()

    const { data, isError } = useQuery('homes', api.home.loadHomes, {
        refetchOnWindowFocus: false,
    })

    const { homes, success } = data?.data

    if (isError || !homes) {
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
                    <PropertiesList data={{ homes, success }} />
                </div>
                <div className="flex sm:col-span-1 flex-col">
                    <Header level="4" className="mb-3 mt-3">
                        Relocations in the future, but empty space for now :)
                    </Header>
                </div>
            </div>
        </div>
    )
}
