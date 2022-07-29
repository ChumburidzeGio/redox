import * as React from 'react'
import { Header } from '../shared-ui'
import { SearchProfile } from './types'

interface ProfileCardProps {
    profile: SearchProfile
}

export const ProfileCard = ({ profile }: ProfileCardProps) => {
    return (
        <div className="overflow-hidden rounded-md border border-gray-200 col-span-1 px-4 py-3">
            <Header level="3" color="text-indigo-700">
                {profile.relocationName}
            </Header>
            <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 mt-4">
                <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                        Budget
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                        €{profile.priceMin}-{profile.priceMax}
                    </dd>
                </div>
                <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                        Min. Surface / Rooms
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                        {profile.surfaceMin || 'No min'} m2 /{' '}
                        {profile.roomsMin || 'No min'} rooms
                    </dd>
                </div>
                <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">
                        Interior
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                        {profile.interior?.join(', ')}
                    </dd>
                </div>
                <div className="sm:col-span-1">
                    <dt className="text-sm font-medium text-gray-500">Type</dt>
                    <dd className="mt-1 text-sm text-gray-900">
                        {profile.type?.join(', ')}
                    </dd>
                </div>
                <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">
                        Districts
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">
                        {profile.districtsInclude?.join(', ')}
                    </dd>
                </div>
            </dl>
        </div>
    )
}
