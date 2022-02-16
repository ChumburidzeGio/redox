import * as React from 'react'
import { MdMap } from 'react-icons/md'
import { AiFillYoutube } from 'react-icons/ai'

interface ImageCardProps {
    videoId?: string
    imageSrc?: string
    mapQuery: string
}

export const ImageCard: React.FC<ImageCardProps> = ({ imageSrc, mapQuery, videoId, children }) => {
    return (
        <div className="flex overflow-hidden rounded flex-col md:flex-row border border-gray-300 shadow mt-6">
            {imageSrc && <div className="sm:w-100 max-w-full sm:max-w-[200px] flex flex-[1_0_auto] sm:min-h-[200px] justify-center items-center overflow-hidden">
                <img src={imageSrc} alt={mapQuery} className="flex-shrink-0 min-w-full min-h-full object-cover" />
            </div>}
            <div className="flex flex-col px-5 py-3 justify-between">
                <div className="flex flex-col">{children}</div>
                <div className="flex flex-wrap">
                    {videoId && <a href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" className="flex no-underline text-blue-700 mr-7 mt-2">
                        <AiFillYoutube size={20} className="mr-2 mt-1" /> Check video
                    </a>}
                    <a href={`https://www.google.com/maps/place/${mapQuery}`} target="_blank" className="flex no-underline text-blue-700 mt-2">
                        <MdMap size={20} className="mr-2 mt-1" /> Check on the map
                    </a>
                </div>
            </div>
        </div>
    )
}
