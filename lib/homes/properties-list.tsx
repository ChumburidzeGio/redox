import * as React from 'react'

import { classNames } from 'lib/shared-ui'
import PropertiesCard from './property-card'
import { Home } from './types'
import { useUser } from '../auth'

interface Props {
    data: Home[]
}

export const PropertiesList: React.FC<Props> = ({ data }) => {
    const { role } = useUser()

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
                {data.map((home: Home) => {
                    return <PropertiesCard key={home.id} home={home} />
                })}
            </ul>
        </div>
    )
}
