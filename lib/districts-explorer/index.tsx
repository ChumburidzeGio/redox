import * as React from 'react'
import districts from './districts'
import { Badge } from 'lib/shared-ui'
import type { BadgeProps } from 'lib/shared-ui'
import { ChevronDoubleDownIcon } from '@heroicons/react/solid'
import { VideoCameraIcon, MapIcon } from '@heroicons/react/outline'

const tagToColor: Record<string, BadgeProps['color']> = {
    safe: 'green',
    unsafe: 'red',
}

interface ImageCardProps {
    videoId?: string
    imageSrc?: string
    mapQuery: string
}

const ImageCard: React.FC<ImageCardProps> = ({
    imageSrc,
    mapQuery,
    videoId,
    children,
}) => {
    return (
        <div className="flex overflow-hidden rounded flex-col md:flex-row border border-gray-300 shadow mt-4">
            {imageSrc && (
                <div className="sm:w-100 max-w-full sm:max-w-[200px] flex flex-[1_0_auto] sm:min-h-[200px] justify-center items-center overflow-hidden">
                    <img
                        src={imageSrc}
                        alt={mapQuery}
                        className="flex-shrink-0 min-w-full min-h-full object-cover"
                    />
                </div>
            )}
            <div className="flex flex-col px-5 py-3 justify-between">
                <div className="flex flex-col">{children}</div>
                <div className="flex flex-wrap text-stone-800">
                    {videoId && (
                        <a
                            href={`https://www.youtube.com/watch?v=${videoId}`}
                            target="_blank"
                            rel="noreferrer"
                            className="flex no-underline mr-7 mt-2 items-center"
                        >
                            <VideoCameraIcon className="h-6 w-6 mr-2" /> Check
                            video
                        </a>
                    )}
                    <a
                        href={`https://www.google.com/maps/place/${mapQuery}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex no-underline mt-2"
                    >
                        <MapIcon className="h-6 w-6 mr-2" /> Check on the map
                    </a>
                </div>
            </div>
        </div>
    )
}

export const DistrictsExplorer: React.FC = () => {
    const [expanded, setExpanded] = React.useState(false)

    return (
        <div className="relative">
            <div
                className={`${expanded ? '' : 'max-h-[450px]'} overflow-hidden`}
            >
                {districts.map((district) => (
                    <ImageCard
                        imageSrc={district.imageSrc}
                        videoId={district.videoId}
                        mapQuery={district.id}
                        key={district.id}
                    >
                        <div className="text-lg font-bold">
                            {district.title}
                        </div>
                        <div className="flex flex-row mb-3 mt-1 flex-wrap">
                            {district.tags.map((tag) => (
                                <div className="mr-1" key={tag}>
                                    <Badge color={tagToColor[tag]}>{tag}</Badge>
                                </div>
                            ))}
                        </div>
                        {district.description}
                    </ImageCard>
                ))}
            </div>
            {!expanded && (
                <div
                    onClick={() => setExpanded(true)}
                    className="absolute flex justify-center bottom-0 left-0 right-0 cursor-pointer pt-12 pb-6 bg-gradient-to-t from-white via-stone-50 items-end text-blue-700 hover:text-blue-500"
                >
                    <div className="flex font-semibold items-center font-sm">
                        <ChevronDoubleDownIcon className="h-5 w-5 mr-2" /> SHOW
                        ALL
                    </div>
                </div>
            )}
        </div>
    )
}
