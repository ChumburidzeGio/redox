import * as React from 'react'
import { ChevronRightIcon, ExternalLinkIcon } from '@heroicons/react/solid'

import { Drawer, Header, Button, classNames } from 'lib/shared-ui'
import { CustomerActions } from './customer-actions'
import { AgentActions } from './agent-actions'
import { Home } from './types'
import { PointOnMap } from './point-on-map'
import { useUser } from 'lib/auth'
import { OfferPreview } from './offer-preview'
import { OfferStatus } from './offer-status'
import { ArrowLeftIcon } from '@heroicons/react/outline'

function Image({
    src,
    isThumbnail,
}: {
    src: string | null
    isThumbnail?: boolean
}) {
    if (!src) {
        return (
            <div
                className={classNames(
                    'flex justify-center items-center overflow-hidden bg-amber-300 font-semibold',
                    isThumbnail
                        ? 'rounded w-[100px] h-[80px] text-sm text-gray-800'
                        : 'h-2'
                )}
            >
                {isThumbnail && `No Photo`}
            </div>
        )
    }

    return (
        <div
            className={classNames(
                'max-w-full flex flex-[1_0_auto] justify-center items-center overflow-hidden',
                isThumbnail
                    ? 'rounded max-w-[100px] max-h-[80px]'
                    : 'max-w-full max-h-[300px]'
            )}
        >
            <img
                src={src}
                alt="img"
                className="flex-shrink-0 min-w-full min-h-full object-cover"
            />
        </div>
    )
}

interface PropertyCardProps {
    home: Home
}

const PropertiesCard = ({ home }: PropertyCardProps) => {
    const [showDetails, setShowDetails] = React.useState(false)
    const { offers } = home
    const { role } = useUser()

    return (
        <li
            className={classNames(
                role === 'admin' ? 'mb-4 border border-gray-200 rounded' : '',
                'block hover:bg-gray-50 cursor-pointer'
            )}
            onClick={() => setShowDetails(true)}
        >
            <Drawer show={showDetails} onClose={() => setShowDetails(false)}>
                <div className="pointer-events-auto w-screen sm:max-w-lg max-w-full">
                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                        <Image src={home.photo} />
                        <div className="flex sm:hidden absolute top-4 left-4 bg-white rounded-full p-2 bg-opacity-70">
                            <ArrowLeftIcon
                                className="h-6 w-6 text-black"
                                aria-hidden="true"
                                onClick={() => setShowDetails(false)}
                            />
                        </div>
                        <div
                            className={classNames(
                                !home.photo ? 'mt-10' : '',
                                'pt-3 px-5 flex flex-col justify-between'
                            )}
                        >
                            <div className="flex flex-col">
                                <Header level="3">{home.street}</Header>
                                <Header level="4" color="text-gray-700">
                                    {home.city}, {home.postcode}{' '}
                                    <span className="text-indigo-600">
                                        · {home.rent}
                                    </span>
                                </Header>
                                <p className="text-sm">
                                    {home.surface} m2 · {home.rooms} rooms ·{' '}
                                    {(home.availability || home.interior) &&
                                        `${
                                            home.availability || home.interior
                                        } ·`}{' '}
                                    By {home.agency}
                                </p>
                            </div>

                            <a
                                href={home.url}
                                target="_blank"
                                className="mt-2"
                                rel="noreferrer"
                            >
                                <Button variant="secondary" className="w-full">
                                    View Details on{' '}
                                    <span className="capitalize ml-1">
                                        {home.source}
                                    </span>
                                    <ExternalLinkIcon className="h-5 w-5 ml-2" />
                                </Button>
                            </a>
                        </div>
                        <div className="px-5 mt-3 border-t border-gray-200 pt-3">
                            <CustomerActions offers={offers || []} />
                            <AgentActions offers={offers || []} />
                        </div>

                        <div className="px-5">
                            {home.coordinates && (
                                <PointOnMap
                                    lat={home.coordinates.lat}
                                    lng={home.coordinates.lng}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </Drawer>
            <div className="flex items-center py-3 sm:px-2 sm:px-4 sm:py-4">
                <div className="min-w-0 flex-1 flex items-center">
                    <Image src={home.photo} isThumbnail />
                    <div className="min-w-0 flex-1 px-4 md:grid md:grid-cols-2 md:gap-4">
                        <div>
                            <p className="text-md font-semibold text-gray-800 truncate">
                                {home.street}
                            </p>
                            <p className="mt-1 flex items-center text-sm text-gray-600 font-medium max-w-full truncate">
                                <span className="text-indigo-600 mr-1">
                                    {home.rent} ·{' '}
                                </span>
                                {home.city}, {home.postcode}
                            </p>
                        </div>
                        <div className="hidden md:block">
                            <p className="text-sm mt-1 text-gray-800 font-medium">
                                {home.surface} m2 · {home.rooms} rooms
                            </p>
                            <p className="text-sm mt-1.5 text-gray-600">
                                {role !== 'admin' ? (
                                    <div>
                                        {<OfferStatus offer={offers[0]} />}
                                    </div>
                                ) : (
                                    home.availability || home.interior
                                )}
                            </p>
                        </div>
                    </div>
                </div>
                <div>
                    <ChevronRightIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                    />
                </div>
            </div>
            {role === 'admin' && (
                <ul
                    role="list"
                    className="divide-y divide-dashed divide-gray-200 border-t border-gray-200"
                >
                    {offers.map((offer) => (
                        <OfferPreview key={offer.id} offer={offer} />
                    ))}
                </ul>
            )}
        </li>
    )
}

export default PropertiesCard
