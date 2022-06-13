import * as React from 'react'
import { useQuery } from 'react-query'

import api from 'lib/api/internal'
import { classNames, Header } from 'lib/shared-ui'
import PropertiesCard from './property-card'
import LoadingState from './loading-state'
import EmptyState from './empty-state'
import { Home } from './types'
import { useUser } from '../auth'

export const PropertiesList = () => {
    const { role } = useUser()
    const { data, isError, isLoading } = useQuery('homes', api.home.loadHomes, {
        refetchOnWindowFocus: false,
    })

    if (isLoading) {
        return <LoadingState />
    }

    if (!data?.data?.homes?.length || isError) {
        return <EmptyState />
    }

    return (
        <div className="mt-4 sm:mt-6">
            <Header level="3">New apartments</Header>
            <div
                className={classNames(
                    'mt-4',
                    role === 'customer'
                        ? 'overflow-hidden rounded-md sm:border border-gray-200'
                        : ''
                )}
            >
                <ul
                    role="list"
                    className={classNames(
                        role === 'customer' ? 'divided-y divided-gray-200' : ''
                    )}
                >
                    {data.data.homes.map((home: Home) => {
                        return <PropertiesCard key={home.id} home={home} />
                    })}
                </ul>
            </div>
        </div>
    )
}
