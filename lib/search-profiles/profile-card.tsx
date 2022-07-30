import * as React from 'react'
import { Badge, Drawer, Header } from '../shared-ui'
import { SearchProfile } from './types'
import { ChevronLeftIcon } from '@heroicons/react/outline'

interface ProfileCardProps {
    profile: SearchProfile
}

function toTitleCase(str: string) {
    return str.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    })
}

export const ProfileCard = ({ profile }: ProfileCardProps) => {
    const [editMode, setEditMode] = React.useState(false)

    const interior = React.useMemo(
        () =>
            profile.interior ? toTitleCase(profile.interior?.join(', ')) : null,
        [profile.interior]
    )

    const type = React.useMemo(
        () => (profile.type ? toTitleCase(profile.type?.join(', ')) : null),
        [profile.type]
    )

    const districts = React.useMemo(
        () =>
            profile.districtsInclude
                ? toTitleCase(profile.districtsInclude?.join(', '))
                : null,
        [profile.districtsInclude]
    )

    return (
        <div
            className="overflow-hidden rounded-md border border-gray-200 col-span-2 sm:col-span-1 px-4 py-3"
            onClick={() => setEditMode(true)}
        >
            <Header level="3" color="text-indigo-700" className="relative">
                {profile.relocationName}{' '}
                <Badge
                    color={profile.active ? 'green' : 'yellow'}
                    size="sm"
                    className="absolute top-1 right-1"
                >
                    {profile.active ? 'Active' : 'Inactive'}
                </Badge>
            </Header>
            <div className="flex flex-row flex-wrap text-sm">
                <div className="flex flex-row">
                    €{profile.priceMin}-{profile.priceMax}
                </div>
                {profile.surfaceMin && (
                    <div className="flex flex-row">
                        <div className="mx-1">·</div>
                        {profile.surfaceMin}+ m2
                    </div>
                )}
                {profile.roomsMin && (
                    <div className="flex flex-row">
                        <div className="mx-1">·</div>
                        {profile.roomsMin}+ rooms
                    </div>
                )}
                {(interior || type) && (
                    <div className="flex flex-row">
                        <div className="mx-1">·</div>
                        {interior} {type}
                    </div>
                )}
            </div>
            <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 mt-4">
                <div className="sm:col-span-2">
                    <dt className="text-sm font-medium text-gray-500">
                        Districts
                    </dt>
                    <dd className="mt-1 text-sm text-gray-900">{districts}</dd>
                </div>
            </dl>

            <Drawer show={editMode} onClose={() => setEditMode(false)}>
                <div className="pointer-events-auto w-screen max-w-md">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                        <div className="flex flex-col px-6 pt-6 pb-7">
                            <div
                                className="flex flex-row items-center cursor-pointer flex sm:hidden text-blue-600 font-semibold text-sm"
                                onClick={() => setEditMode(false)}
                            >
                                <ChevronLeftIcon className="h-5 mr-1" />
                                Go Back
                            </div>
                        </div>
                    </div>
                </div>
            </Drawer>
        </div>
    )
}
