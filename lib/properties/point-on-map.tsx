import * as React from 'react'
import ReactMapboxGl, { Marker } from 'react-mapbox-gl'
import { LocationMarkerIcon } from '@heroicons/react/solid'
import config from 'config'
import { Delay } from '../shared-ui'

const Map = ReactMapboxGl({
    accessToken: config.mapToken as string,
})

interface PointOnMapProps {
    lat: number
    lng: number
}

export const PointOnMap = ({ lat, lng }: PointOnMapProps) => {
    return (
        <div className="rounded-md overflow-hidden mt-4 h-[200px]">
            <Delay by={250}>
                <Map
                    style="mapbox://styles/mapbox/streets-v11"
                    containerStyle={{
                        height: '200px',
                        width: '100%',
                    }}
                    zoom={[11]}
                    center={[lng, lat]}
                >
                    <Marker coordinates={[lng, lat]}>
                        <LocationMarkerIcon className="h-10 w-10 text-blue-700" />
                    </Marker>
                </Map>
            </Delay>
        </div>
    )
}
