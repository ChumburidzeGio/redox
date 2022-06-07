import * as React from 'react'
import ReactMapboxGl, { Marker } from 'react-mapbox-gl'
import { LocationMarkerIcon } from '@heroicons/react/solid'
import config from 'config'

const Map = ReactMapboxGl({
    accessToken: config.mapToken as string,
})

interface PointOnMapProps {
    lat: number
    lng: number
}

export const PointOnMap = ({ lat, lng }: PointOnMapProps) => {
    const [show, setShow] = React.useState(false)

    React.useEffect(() => {
        setTimeout(() => setShow(true), 250)
    }, [])

    return (
        <div className="mt-4 rounded-md overflow-hidden">
            {show && (
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
            )}
        </div>
    )
}
