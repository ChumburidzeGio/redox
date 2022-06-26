import * as React from 'react'

import { classNames } from 'lib/shared-ui'
import PropertiesCard from './property-card'
import EmptyState from './empty-state'
import { Home } from './types'
import { useUser } from '../auth'

interface Props {
    data: {
        success: boolean
        homes: Home[]
    }
}

export const PropertiesList: React.FC<Props> = ({ data }) => {
    const { role } = useUser()

    if (!data?.success || data.homes.length === 0) {
        return <EmptyState />
    }

    return (
        <div
            className={classNames(
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
                {data.homes.map((home: Home) => {
                    return <PropertiesCard key={home.id} home={home} />
                })}
            </ul>
        </div>
    )
}
